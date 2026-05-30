import { Pool } from 'pg';
import { nanoid } from 'nanoid';
import predict from '../../../utils/predict.js';
class MedicalRecordsRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async addMedicalRecord(medicalRecordData, userId) {
    const idHealth = `mr-${nanoid(16)}`;
    const idScreening = `sc-${nanoid(16)}`;
    const idHistoryScreening = `hs-${nanoid(16)}`;
    const client = await this.pool.connect();

    try {
      const predictionData = {
        age: medicalRecordData.age,
        gender: medicalRecordData.gender,
        weight: medicalRecordData.weight,
        height: medicalRecordData.height,
        ap_hi: medicalRecordData.systolicPressure,
        ap_lo: medicalRecordData.diastolicPressure,
        cholesterol: medicalRecordData.cholesterolLevel,
        gluc: medicalRecordData.glucoseLevel,
        smoke: medicalRecordData.smokingStatus,
        alco: medicalRecordData.alcoholStatus,
        active: medicalRecordData.activityStatus,
      };

      const aiResponse = await predict(predictionData);

      await client.query('BEGIN');

      const monitoringQuery = await client.query(
        'INSERT INTO health_monitoring(id, user_id, age, gender, weight, height, systolic_pressure, diastolic_pressure, cholesterol_level, glucose_level, smoking_status, alcohol_status, activity_status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
        [
          idHealth,
          userId,
          medicalRecordData.age,
          medicalRecordData.gender,
          medicalRecordData.weight,
          medicalRecordData.height,
          medicalRecordData.systolicPressure,
          medicalRecordData.diastolicPressure,
          medicalRecordData.cholesterolLevel,
          medicalRecordData.glucoseLevel,
          medicalRecordData.smokingStatus,
          medicalRecordData.alcoholStatus,
          medicalRecordData.activityStatus,
        ],
      );

      const screeningQuery = await client.query(
        `INSERT INTO screening(id, user_id, monitoring_id, label, probability, category, recommendation, threshold_used) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [
          idScreening,
          userId,
          monitoringQuery.rows[0].id,
          aiResponse.prediction.label,
          aiResponse.prediction.probability,
          aiResponse.prediction.category,
          aiResponse.clinical_analysis.recommendation,
          aiResponse.prediction.threshold_used,
        ],
      );

      const metadataPayload = {
        top_risk_factors: aiResponse.clinical_analysis.top_risk_factors,
        ai_expert_recommendation: aiResponse.ai_expert_recommendation,
        model_version: aiResponse.model_version || 'v1.0.0',
      };

      const historyScreeningQuery = await client.query(
        `INSERT INTO screenings_histories(id, screening_id, activity, metadata) VALUES($1, $2, $3, $4) RETURNING *`,
        [
          idHistoryScreening,
          idScreening,
          'Inference Execution',
          JSON.stringify(metadataPayload),
        ],
      );

      const monitoringResult = monitoringQuery.rows[0];
      const screeningResult = screeningQuery.rows[0];
      const historyScreeningResult = historyScreeningQuery.rows[0];

      await client.query('COMMIT');

      return {
        ...monitoringResult,
        screening: {
          ...screeningResult,
          history: historyScreeningResult,
        },
      };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
  async historiesScreeningByUserId(userId) {
    const query = `
      SELECT 
        s.id AS screening_id, 
        s.category, 
        s.probability, 
        s.created_at,
        m.systolic_pressure,
        m.diastolic_pressure
      FROM screening s
      JOIN health_monitoring m ON s.monitoring_id = m.id
      WHERE s.user_id = $1
      ORDER BY s.created_at DESC;
    `;

    const { rows } = await this.pool.query(query, [userId]);
    return rows;
  }
  async detailScreeningById(screeningId, userId) {
    const query = `
    SELECT *
    FROM screenings_histories h
    JOIN screening s ON h.screening_id = s.id
    JOIN health_monitoring m ON s.monitoring_id = m.id
    WHERE s.id = $1 AND s.user_id = $2
  `;
    const { rows } = await this.pool.query(query, [screeningId, userId]);
    console.log('rows:', rows);
    return rows[0];
  }
  async deleteMedicalRecordById(screeningId, userId) {
    const query = {
      text: 'DELETE FROM screening WHERE id = $1 AND user_id = $2 RETURNING id',
      values: [screeningId, userId],
    };
    const result = await this.pool.query(query);
    return result.rows[0]?.id || null;
  }
  async summaryScreeningByUserId(userId) {
    const query = `
    WITH ordered AS (
      SELECT
        probability,
        category,
        created_at,
        ROW_NUMBER() OVER (ORDER BY created_at ASC) AS rn_asc,
        ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn_desc
      FROM screening
      WHERE user_id = $1
    ),
    streak AS (
      SELECT COUNT(*)::int AS streak_high_risk
      FROM (
        SELECT category,
               ROW_NUMBER() OVER (ORDER BY created_at DESC) AS rn,
               ROW_NUMBER() OVER (PARTITION BY category ORDER BY created_at DESC) AS grp
        FROM screening
        WHERE user_id = $1
      ) s
      WHERE category = 'BERISIKO TINGGI'
        AND rn = grp
    )
    SELECT
      COUNT(*)::int AS total_screenings,
      ROUND(AVG(probability)::numeric, 2) AS average_probability,
      COUNT(*) FILTER (WHERE category = 'BERISIKO TINGGI')::int AS high_risk_count,
      COUNT(*) FILTER (WHERE category = 'TIDAK BERISIKO')::int AS low_risk_count,

      MIN(created_at) AS first_screening_at,
      MAX(created_at) AS last_screening_at,

      (SELECT category FROM ordered WHERE rn_desc = 1) AS latest_category,
      (SELECT probability FROM ordered WHERE rn_desc = 1) AS latest_probability,

      (SELECT probability FROM ordered WHERE rn_asc = 1) AS first_probability,

      (SELECT streak_high_risk FROM streak) AS streak_high_risk
    FROM screening
    WHERE user_id = $1;
  `;
    const { rows } = await this.pool.query(query, [userId]);
    return rows[0];
  }

  async trendScreeningByUserId(userId, period) {
    const intervalMap = {
      '7d': '7 day',
      '30d': '30 day',
      '6m': '6 month',
      '1y': '1 year',
    };

    const interval = intervalMap[period] || '30 day';
    const query = `
    SELECT s.id AS screening_id,
    DATE(created_at) AS date,
    s.probability,
    s.category,
    m.systolic_pressure,
    m.diastolic_pressure,
    m.weight,
    m.height
    FROM screening s
    JOIN health_monitoring m ON s.monitoring_id = m.id
    WHERE s.user_id = $1
    AND s.created_at >= NOW() - INTERVAL '${interval}'
    ORDER BY s.created_at ASC
    `;

    const { rows } = await this.pool.query(query, [userId]);
    return rows;
  }
}

export default new MedicalRecordsRepositories();

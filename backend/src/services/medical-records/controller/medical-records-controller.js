import medicalRecordsRepositories from '../repositories/medical-records-repositories.js';
import { InvariantError } from '../../../exceptions/index.js';
import response from '../../../utils/response.js';

export const addMedicalRecord = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const medicalRecordData = req.validated;
    const result = await medicalRecordsRepositories.addMedicalRecord(
      medicalRecordData,
      userId,
    );
    const heightInMeter = result.height / 100;
    const bmiScore = result.weight / (heightInMeter * heightInMeter);
    const bmi = parseFloat(bmiScore.toFixed(1));

    let bmiCategory = '';
    if (bmi < 18.5) bmiCategory = 'Berat Badan Kurang';
    else if (bmi < 25.0) bmiCategory = 'Normal';
    else if (bmi < 30.0) bmiCategory = 'Kelebihan Berat Badan';
    else bmiCategory = 'Obesitas';

    const genderMapping = { 1: 'Perempuan', 2: 'Laki-laki' };
    const levelMapping = {
      1: 'Normal',
      2: 'Di Atas Normal',
      3: 'Jauh Di Atas Normal',
    };
    const statusMapping = { 0: 'Tidak', 1: 'Ya' };
    const formattedResponse = {
      recordId: result.id,
      screeningId: result.screening.id,
      patientVitals: {
        age: result.age,
        gender: result.gender === 1 ? 'Male' : 'Female',
        bloodPressure: `${result.systolic_pressure}/${result.diastolic_pressure} mmHg`,
        bmi: bmi,
        bmiCategory: bmiCategory,
        cholesterolLevel: levelMapping[result.cholesterol_level],
        glucoseLevel: levelMapping[result.glucose_level],
      },
      lifestyle: {
        smokingStatus: statusMapping[result.smoking_status],
        alcoholStatus: statusMapping[result.alcohol_status],
        activityStatus: statusMapping[result.activity_status],
      },
      ai_result: {
        label: result.screening.label,
        probability: parseFloat(result.screening.probability).toFixed(2),
        category: result.screening.category,
        risk_factors: result.screening.history.metadata.top_risk_factors,
      },
      recommendation: {
        general: result.screening.recommendation,
        ai_expert_recommendation:
          result.screening.history.metadata.ai_expert_recommendation
            .split('\n')
            .map((item) => item.replace(/^\d+\.\s*/, '').trim())
            .filter((item) => item.length > 0),
      },
    };
    return response(
      res,
      201,
      'Medical record added successfully',
      formattedResponse,
    );
  } catch (error) {
    next(error);
  }
};

export const getHistoriesScreeningByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const rawHistories =
      await medicalRecordsRepositories.historiesScreeningByUserId(userId);

    const formattedHistories = rawHistories.map((row) => ({
      screening_id: row.screening_id,
      recorded_at: row.created_at,
      blood_pressure: `${row.systolic_pressure}/${row.diastolic_pressure} mmHg`,
      category: row.category,
      probability: parseFloat(row.probability),
    }));

    return response(
      res,
      200,
      'Histories screening berhasil diambil.',
      formattedHistories,
    );
  } catch (error) {
    next(error);
  }
};

export const getDetailScreeningById = async (req, res, next) => {
  try {
    const screeningId = req.params.screeningId;
    const userId = req.user.id;

    const row = await medicalRecordsRepositories.detailScreeningById(
      screeningId,
      userId,
    );

    if (!row) {
      next(new InvariantError('Detail screening tidak ditemukan'));
    }
    const genderMapping = { 1: 'Perempuan', 2: 'Laki-laki' };
    const levelMapping = {
      1: 'Normal',
      2: 'Di Atas Normal',
      3: 'Jauh Di Atas Normal',
    };
    const statusMapping = { 0: 'Tidak', 1: 'Ya' };

    const heightInMeter = row.height / 100;
    const bmiScore = row.weight / (heightInMeter * heightInMeter);
    const bmi = parseFloat(bmiScore.toFixed(1));

    let bmiCategory = '';
    if (bmi < 18.5) bmiCategory = 'Berat Badan Kurang';
    else if (bmi < 25.0) bmiCategory = 'Normal';
    else if (bmi < 30.0) bmiCategory = 'Kelebihan Berat Badan';
    else bmiCategory = 'Obesitas';

    const metadata =
      typeof row.metadata === 'string'
        ? JSON.parse(row.metadata)
        : row.metadata;
    const formattedResponse = {
      record_id: row.monitoring_id,
      screening_id: row.screening_id,
      recorded_at: row.created_at,
      activity: row.activity,

      patient_vitals: {
        age: row.age,
        gender: genderMapping[row.gender] || 'Tidak Diketahui',
        weight: `${row.weight} kg`,
        height: `${row.height} cm`,
        bmi: bmi,
        bmi_category: bmiCategory,
        blood_pressure: `${row.systolic_pressure}/${row.diastolic_pressure} mmHg`,
        cholesterol_level:
          levelMapping[row.cholesterol_level] || 'Tidak Diketahui',
        glucose_level: levelMapping[row.glucose_level] || 'Tidak Diketahui',
        lifestyle: {
          smoking: statusMapping[row.smoking_status] || 'Tidak Diketahui',
          alcohol: statusMapping[row.alcohol_status] || 'Tidak Diketahui',
          active_exercise:
            statusMapping[row.activity_status] || 'Tidak Diketahui',
        },
      },

      ai_result: {
        label: row.label,
        probability: parseFloat(row.probability),
        category: row.category,
        risk_factors: metadata?.top_risk_factors || [],
      },

      recommendations: {
        general: row.recommendation,
        ai_expert: metadata?.ai_expert_recommendation
          ? metadata.ai_expert_recommendation
              .split('\n')
              .map((item) => item.replace(/^\d+\.\s*/, '').trim())
              .filter((item) => item.length > 0)
          : [],
      },
    };
    return response(
      res,
      200,
      'Detail screening berhasil diambil.',
      formattedResponse,
    );
  } catch (error) {
    next(error);
  }
};

export const deleteMedicalRecordById = async (req, res, next) => {
  try {
    const screeningId = req.params.screeningId;
    const userId = req.user.id;
    const deletedId = await medicalRecordsRepositories.deleteMedicalRecordById(
      sceeningId,
      userId,
    );
    if (!deletedId) {
      return next(new InvariantError('Screening tidak ditemukan '));
    }
    return response(res, 200, 'Screening berhasil dihapus', {
      id: deletedId,
    });
  } catch (error) {
    next(error);
  }
};

export const getSummaryScreeningByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data =
      await medicalRecordsRepositories.summaryScreeningByUserId(userId);
    if (data.length === 0) {
      return response(res, 200, 'Belum ada data screening untuk user ini', {
        total_screenings: 0,
        average_probability: 0,
        latest_category: null,
        latest_probability: null,
        risk_count: { low_risk: 0, high_risk: 0 },
      });
    }
    return response(res, 200, 'Summary berhasil diambil', {
      total_screenings: data.total_screenings,
      average_probability: parseFloat(data.average_probability),
      latest_category: data.latest_category,
      latest_probability: parseFloat(data.latest_probability),
      risk_count: {
        low_risk: data.low_risk,
        high_risk: data.high_risk,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTrendScreening = async (res, req, next) => {
  try {
    const userId = req.user.id;
    const period = req.query.period || '30d';
    const allowedPeriods = ['7d', '30d', '6m', '1y'];
    if (!allowedPeriods.includes(period)) {
      return next(
        new InvariantError('Period tidak valid. Gunakan: 7d, 30d, 6m, atau 1y'),
      );
    }
    const rows = await medicalRecordsRepositories.trendScreeningByUserId(
      userId,
      period,
    );
    const dataPoints = rows.map((row) => {
      const heightInMeter = row.height / 100;
      const bmi = parseFloat(
        (row.weight / (heightInMeter * heightInMeter)).toFixed(1),
      );

      return {
        screening_id: row.screening_id,
        date: row.date,
        probability: parseFloat(row.probability),
        category: row.category,
        blood_pressure: `${row.systolic_pressure}/${row.diastolic_pressure} mmHg`,
        bmi,
      };
    });
    let trend_direction = 'stable';
    if (dataPoints.length >= 2) {
      const last = dataPoints[dataPoints.length - 1].probability;
      const prev = dataPoints[dataPoints.length - 2].probability;
      if (last < prev - 0.05) trend_direction = 'improving';
      else if (last > prev + 0.05) trend_direction = 'worsening';
    }

    return response(res, 200, 'Trend berhasil diambil', {
      period,
      total_data: dataPoints.length,
      trend_direction,
      data_points: dataPoints,
    });
  } catch (error) {}
};

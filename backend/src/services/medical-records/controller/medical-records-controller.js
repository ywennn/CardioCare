import medicalRecordsRepositories from '../repositories/medical-records-repositories.js';

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
    const userId = req.user.id; // Ambil ID User dari middleware JWT kamu

    const rawHistories =
      await medicalRecordsRepositories.historiesScreeningByUserId(userId);

    const formattedHistories = rawHistories.map((row) => ({
      screening_id: row.screening_id,
      recorded_at: row.created_at,
      blood_pressure: `${row.systolic_pressure}/${row.diastolic_pressure} mmHg`,
      category: row.category,
      probability: parseFloat(row.probability),
    }));

    return res.status(200).json({
      code: 200,
      status: 'success',
      message: 'Daftar riwayat skrining berhasil diambil.',
      data: formattedHistories,
    });
  } catch (error) {
    next(error);
  }
};

export const getDetailScreeningById = async (req, res, next) => {
  try {
    const screeningId = req.params.screeningId;

    const row =
      await medicalRecordsRepositories.detailScreeningById(screeningId);

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
    return res.status(200).json({
      code: 200,
      status: 'success',
      message: 'Detail skrining berhasil diambil.',
      data: formattedResponse,
    });
  } catch (error) {
    next(error);
  }
};

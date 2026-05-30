import Joi from 'joi';

const mappingGender = {
  0: 'Perempuan',
  1: 'Laki-laki',
};
export const medicalRecordPayloadSchema = Joi.object({
  age: Joi.number().integer().min(0).required(),
  gender: Joi.number()
    .integer()
    .valid(...Object.keys(mappingGender).map(Number))
    .required(),
  weight: Joi.number().integer().min(0).required(),
  height: Joi.number().integer().min(0).required(),
  systolicPressure: Joi.number().integer().min(0).required(),
  diastolicPressure: Joi.number().integer().min(0).required(),
  cholesterolLevel: Joi.number().integer().min(0).valid(0, 1, 2, 3).required(),
  glucoseLevel: Joi.number().integer().min(0).required(),
  smokingStatus: Joi.number().integer().valid(0, 1).required(),
  alcoholStatus: Joi.number().integer().valid(0, 1).required(),
  activityStatus: Joi.number().integer().valid(0, 1).required(),
});

import Joi from 'joi';

export const userPayloadSchema = Joi.object({
  fullName: Joi.string().required(),
  username: Joi.string().required(),
  birthDate: Joi.date().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

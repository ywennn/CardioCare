import Joi from 'joi';

export const userPayloadSchema = Joi.object({
  fullName: Joi.string().required(),
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const userUpdatePayloadSchema = Joi.object({
  fullName: Joi.string().required(),
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const userPasswordUpdatePayloadSchema = Joi.object({
  oldPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required(),
});

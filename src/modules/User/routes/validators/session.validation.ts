import { celebrate, Joi, Segments } from 'celebrate';

export const createSessionMiddleware = celebrate({
  [Segments.PARAMS]: {
    role: Joi.string().required(),
  },
  [Segments.BODY]: {
    device_token: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    remember_me: Joi.boolean(),
  },
});


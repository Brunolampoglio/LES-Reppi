import { celebrate, Joi, Segments } from 'celebrate';

export const createSessionMiddleware = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    remember_me: Joi.boolean(),
  },
});

export const refreshTokenMiddleware = celebrate({
  [Segments.BODY]: {
    refresh_token: Joi.string().uuid().required(),
  },
});

export const destroySessionMiddleware = celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    refresh_token: Joi.string().uuid().required(),
  },
});

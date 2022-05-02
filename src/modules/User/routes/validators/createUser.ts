import { celebrate, Joi, Segments } from 'celebrate';

export const createUserMiddleware = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});

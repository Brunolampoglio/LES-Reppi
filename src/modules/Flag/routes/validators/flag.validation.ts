import { celebrate, Joi, Segments } from 'celebrate';

export const createFlagMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  },
});

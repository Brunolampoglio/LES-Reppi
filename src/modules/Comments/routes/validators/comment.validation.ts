import { celebrate, Joi, Segments } from 'celebrate';

export const createCommentMiddleware = celebrate({
  [Segments.BODY]: {
    comment: Joi.string().required(),
    rate: Joi.number().required(),
  },
  [Segments.PARAMS]: {
    userReceiver_id: Joi.string().uuid().required(),
  },
});

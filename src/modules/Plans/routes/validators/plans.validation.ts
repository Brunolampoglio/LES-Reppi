import { celebrate, Joi, Segments } from 'celebrate';

export const createPlanMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    recurrence: Joi.string().required(),
    qtd_access: Joi.number().required(),
  },
});

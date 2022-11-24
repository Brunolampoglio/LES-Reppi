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

export const deletePlanMiddleware = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updatePlanMiddleware = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    recurrence: Joi.string(),
    qtd_access: Joi.number(),
  },
});

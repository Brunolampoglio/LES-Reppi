import { celebrate, Segments, Joi } from 'celebrate';

export const createCuponMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required(),
    active: Joi.boolean().required(),
  },
});

export const updateCuponMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required(),
    active: Joi.boolean().required(),
  },
  [Segments.PARAMS]: {
    cupon_id: Joi.string().uuid().required(),
  },
});

export const deleteCuponMiddleware = celebrate({
  [Segments.PARAMS]: {
    cupon_id: Joi.string().uuid().required(),
  },
});

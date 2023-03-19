import { celebrate, Segments, Joi } from 'celebrate';

export const createCouponMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required(),
    active: Joi.boolean().required(),
  },
});

export const updateCouponMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required(),
    active: Joi.boolean().required(),
  },
  [Segments.PARAMS]: {
    coupon_id: Joi.string().uuid().required(),
  },
});

export const deleteCouponMiddleware = celebrate({
  [Segments.PARAMS]: {
    coupon_id: Joi.string().uuid().required(),
  },
});

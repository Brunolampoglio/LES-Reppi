import { celebrate, Segments, Joi } from 'celebrate';

export const createCartMiddleware = celebrate({
  [Segments.BODY]: {
    product_id: Joi.string().uuid().required(),
  },
});

export const updateCartMiddleware = celebrate({
  [Segments.BODY]: {
    product_id: Joi.string().uuid().required(),
    is_subtract: Joi.boolean(),
  },
  [Segments.PARAMS]: {
    cart_id: Joi.string().uuid().required(),
  },
});

export const removeItemCartMiddleware = celebrate({
  [Segments.BODY]: {
    product_id: Joi.string().uuid().required(),
  },
  [Segments.PARAMS]: {
    cart_id: Joi.string().uuid().required(),
  },
});

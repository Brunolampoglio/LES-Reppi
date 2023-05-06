import { celebrate, Joi, Segments } from 'celebrate';

export const createInvoiceMiddleware = celebrate({
  [Segments.BODY]: {
    address_id: Joi.string().required(),
    cart_id: Joi.string().required(),
    coupon_ids: Joi.array().items(Joi.string()),
    card_ids: Joi.array().items({
      card_id: Joi.string().required(),
      value: Joi.number().required(),
    }),
    freight: Joi.number().required(),
  },
});

export const updateInvoiceMiddleware = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
  [Segments.BODY]: {
    status: Joi.string().required(),
  },
});

export const requestExchangeMiddleware = celebrate({
  [Segments.PARAMS]: {
    product_id: Joi.string().required(),
  },
  [Segments.BODY]: {
    reason: Joi.string().required(),
  },
});

export const requestExchangeStatusMiddleware = celebrate({
  [Segments.PARAMS]: {
    product_id: Joi.string().required(),
  },
  [Segments.BODY]: {
    status: Joi.string().required(),
  },
});

export const showInvoiceMiddleware = celebrate({
  [Segments.PARAMS]: {
    invoice_id: Joi.string().required(),
  },
});

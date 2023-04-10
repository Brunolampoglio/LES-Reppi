import { celebrate, Joi, Segments } from 'celebrate';

export const createInvoiceMiddleware = celebrate({
  [Segments.BODY]: {
    address_id: Joi.string().required(),
    cart_id: Joi.string().required(),
    discount: Joi.number().required(),
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

export const showInvoiceMiddleware = celebrate({
  [Segments.PARAMS]: {
    invoice_id: Joi.string().required(),
  },
});

import { celebrate, Segments, Joi } from 'celebrate';

export const createCardMiddleware = celebrate({
  [Segments.BODY]: {
    first_digits: Joi.string().required(),
    last_digits: Joi.string().required(),
    brand: Joi.string().required(),
    holder_name: Joi.string().required(),
    expiration_month: Joi.string().required(),
    expiration_year: Joi.string().required(),
    main: Joi.boolean().required(),
  },
});

export const deleteCardMiddleware = celebrate({
  [Segments.PARAMS]: {
    card_id: Joi.string().uuid().required(),
  },
});

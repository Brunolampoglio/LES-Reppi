import { celebrate, Segments, Joi } from "celebrate";

export const createCardMiddleware = celebrate({
  [Segments.BODY]: {
    holder_name: Joi.string().required(),
    digits: Joi.string().required(),
    expiration: Joi.string().required(),
    main: Joi.boolean().required(),
  },
});

export const updateCardMiddleware = celebrate({
  [Segments.BODY]: {
    holder_name: Joi.string(),
    digits: Joi.string(),
    expiration: Joi.string(),
    main: Joi.boolean(),
  },
  [Segments.PARAMS]: {
    card_id: Joi.string().uuid().required(),
  },
});

export const deleteCardMiddleware = celebrate({
  [Segments.PARAMS]: {
    card_id: Joi.string().uuid().required(),
  },
});

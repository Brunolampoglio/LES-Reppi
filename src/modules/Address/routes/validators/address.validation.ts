import { celebrate, Joi, Segments } from 'celebrate';

export const createAddressMiddleware = celebrate({
  [Segments.BODY]: {
    zip: Joi.string().min(8).max(9).required().label('CEP'),
    street: Joi.string().required().label('rua'),
    street_type: Joi.string().required().label('tipo de Logadouro'),
    is_default: Joi.boolean().required(),
    neighborhood: Joi.string().required().label('bairro'),
    uf: Joi.string().length(2).required(),
    city: Joi.string().required().label('cidade'),
    obs: Joi.string().required(),
    country: Joi.string().required(),
    type_residence: Joi.string().required(),
    number: Joi.string()
      .max(6)
      .pattern(/^[0-9]+$/)
      .label('número'),
  },
});

export const updateAddressMiddleware = celebrate({
  [Segments.PARAMS]: {
    address_id: Joi.string().required(),
  },
  [Segments.BODY]: {
    zip: Joi.string().min(8).max(9).required().label('CEP'),
    street: Joi.string().required().label('rua'),
    street_type: Joi.string().required().label('tipo de Logadouro'),
    is_default: Joi.boolean().required(),
    neighborhood: Joi.string().required().label('bairro'),
    uf: Joi.string().length(2).required(),
    city: Joi.string().required().label('cidade'),
    obs: Joi.string().required(),
    country: Joi.string().required(),
    type_residence: Joi.string().required(),
    number: Joi.string()
      .max(6)
      .pattern(/^[0-9]+$/)
      .label('número'),
  },
});

export const deleteAddressMiddleware = celebrate({
  [Segments.PARAMS]: {
    address_id: Joi.string().required(),
  },
});

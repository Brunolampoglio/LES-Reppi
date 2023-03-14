import { celebrate, Joi, Segments } from 'celebrate';

import validator from 'cpf-cnpj-validator';

const JoiCpf = Joi.extend(validator);

export const createUserMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .required()
      .min(8)
      .label('senha')
      .pattern(/^[a-zA-Z0-9!@#$%&*,]{3,30}$/),
    cpf: JoiCpf.document().cpf().message('CPF inválido'),
    birth_date: Joi.string().required(),
    gender: Joi.string().required(),
    phone: Joi.string().required(),
    type_phone: Joi.string().required(),
    address: Joi.object({
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
    }),
  },
});

export const updateUserMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    cpf: JoiCpf.document().cpf().message('CPF inválido'),
    birth_date: Joi.string().required(),
    gender: Joi.string().required(),
    phone: Joi.string().required(),
  },
});

export const updateUserStatusMiddleware = celebrate({
  [Segments.BODY]: {
    status: Joi.string().required(),
  },
});

export const getUserMiddleware = celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().required(),
  },
});

import { celebrate, Joi, Segments } from 'celebrate';

import validator from 'cpf-cnpj-validator';

const JoiCpf = Joi.extend(validator);

export const createUserMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).label('senha').pattern(new RegExp('^[a-zA-Z0-9!@#$%&*,]{3,30}$')),
    cpf: JoiCpf.document().cpf().message('CPF inválido'),
    birth_date: Joi.date().required(),
    gender: Joi.string().required(),
    phone: Joi.string().required(),
    type_phone: Joi.string().required(),
    address: Joi.object({
      zip: Joi.string().min(8).max(9).required().label('CEP'),
      street: Joi.string().required().label('rua'),
      uf: Joi.string().length(2).required(),
      city: Joi.string().required().label('cidade'),
      obs: Joi.string().required(),
      typeResidence: Joi.string().required(),
      number: Joi.string()
        .max(6)
        .pattern(/^[0-9]+$/)
        .label('número'),
    }),
  },
});

export const updateUserMiddleware = celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().required(),
  },
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).label('senha').pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    cpf: JoiCpf.document().cpf().message('CPF inválido'),
    birth_date: Joi.date().required(),
    gender: Joi.string().required(),
    phone: Joi.string().required(),
    type_phone: Joi.string().required(),
  },
});

export const updateUserStatusMiddleware = celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().required(),
  },
  [Segments.BODY]: {
    status: Joi.string().required(),
  },
});

export const getUserMiddleware = celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().required(),
  },
});

export const deleteUserMiddleware = celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().required(),
  },
});


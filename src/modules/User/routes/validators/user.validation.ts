import { celebrate, Joi, Segments } from 'celebrate';

export const createUserMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    cpf: Joi.string(),
    cnpj: Joi.string(),
    corporate_name: Joi.string(),
    position: Joi.string(),
    role: Joi.string().valid('Master', 'Paciente', 'Gestor', 'Funcionário'),
    address: Joi.object({
      zip: Joi.string().min(8).max(9).required().label('CEP'),
      street: Joi.string().required().label('rua'),
      uf: Joi.string().length(2).required(),
      city: Joi.string().required().label('cidade'),
      district: Joi.string().required().label('bairro'),
      number: Joi.string()
        .max(6)
        .pattern(/^[0-9]+$/)
        .label('número'),
    }),
  },
});

export const listUserMiddleware = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(50),
  },
});

export const showUserMiddleware = celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().uuid().required(),
  },
});

export const updateUserMiddleware = celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    name: Joi.string(),
    cpf: Joi.string(),
    cnpj: Joi.string(),
    corporate_name: Joi.string(),
  },
});

export const updateStatusMiddleware = celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    status: Joi.boolean().required(),
  },
});


export const deleteUserMiddleware = celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().uuid().required(),
  },
});

export const updateUserAvatarMiddleware = celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    avatar: Joi.string(),
  },
});

export const deleteUserAvatarMiddleware = celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().uuid().required(),
  },
});

import { celebrate, Joi, Segments } from 'celebrate';

import validator from 'cpf-cnpj-validator';

const JoiCpf = Joi.extend(validator);

export const createUserMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    cpf: JoiCpf.document().cpf(),
    cnpj: JoiCpf.document().cnpj(),
    corporate_name: Joi.string(),
    position: Joi.string(),
    gestor_id: Joi.string().uuid(),
    role: Joi.string().valid('Master', 'Paciente', 'Gestor', 'Funcionario'),
    phone_number: Joi.string().required(),
    address: Joi.object({
      zip: Joi.string().min(8).max(9).required().label('CEP'),
      street: Joi.string().required().label('rua'),
      uf: Joi.string().length(2).required(),
      city: Joi.string().required().label('cidade'),
      complement: Joi.string(),
      number: Joi.string()
        .max(6)
        .pattern(/^[0-9]+$/)
        .label('número'),
    }),
  },
});

export const createGestorMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    cpf: JoiCpf.document().cpf(),
    cnpj: JoiCpf.document().cnpj(),
    corporate_name: Joi.string(),
    role: Joi.string().valid('Master', 'Paciente', 'Gestor', 'Funcionario'),
    phone_number: Joi.string().required(),
    plan_id: Joi.string().uuid().required(),
    address: Joi.object({
      zip: Joi.string().min(8).max(9).required().label('CEP'),
      street: Joi.string().required().label('rua'),
      uf: Joi.string().length(2).required(),
      city: Joi.string().required().label('cidade'),
      complement: Joi.string(),
      number: Joi.string()
        .max(6)
        .pattern(/^[0-9]+$/)
        .label('número'),
    }),
    card: Joi.object({
        holder_name: Joi.string().required(),
        digits: Joi.string().required(),
        expiration: Joi.string().required(),
        main: Joi.boolean().required(),
  }),
}
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
    password: Joi.string().min(8),
    cpf: JoiCpf.document().cpf(),
    corporate_name: Joi.string(),
    position: Joi.string(),
    role: Joi.string().valid('Master', 'Paciente', 'Gestor', 'Funcionario'),
    phone_number: Joi.string(),
    address: Joi.object({
      zip: Joi.string().min(8).max(9).label('CEP'),
      street: Joi.string().label('rua'),
      uf: Joi.string().length(2),
      city: Joi.string().label('cidade'),
      complement: Joi.string(),
      number: Joi.string()
        .max(6)
        .pattern(/^[0-9]+$/)
        .label('número'),
    }),
  },
});

export const updateEmployeeMiddleware = celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    name: Joi.string(),
    password: Joi.string().min(8),
    cpf: JoiCpf.document().cpf(),
    position: Joi.string(),
    phone_number: Joi.string(),
    email: Joi.string().email(),

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

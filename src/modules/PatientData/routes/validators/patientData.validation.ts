import { celebrate, Joi, Segments } from 'celebrate';


export const createPatientDataMiddleware = celebrate({
  [Segments.BODY]: {
    colesterol: Joi.string().required(),
    creatinina: Joi.string().required(),
    hemoglobina_glicada: Joi.string().required(),
    peso: Joi.string().required(),
    descricao: Joi.string().required(),
  },
});


export const deletePatientDataMiddleware = celebrate({
  [Segments.PARAMS]: {
    patientDataId: Joi.string().uuid().required(),
  },
});

export const updatePatientDataMiddleware = celebrate({
  [Segments.PARAMS]: {
    patientId: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    colesterol: Joi.string(),
    creatinina: Joi.string(),
    hemoglobina_glicada: Joi.string(),
    peso: Joi.string(),
    descricao: Joi.string(),
  },
});

export const listPatientDataMiddleware = celebrate({
  [Segments.PARAMS]: {
    patientId: Joi.string().uuid().required(),
  },
});


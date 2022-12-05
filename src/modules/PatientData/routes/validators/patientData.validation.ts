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

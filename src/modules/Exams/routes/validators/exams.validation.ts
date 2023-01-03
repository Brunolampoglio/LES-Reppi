import { celebrate, Segments, Joi } from "celebrate";

export const createExamsMiddleware = celebrate({
  [Segments.PARAMS]: {
    patient_id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    name: Joi.string().required(),
    hour: Joi.string().required(),
    day: Joi.string().required(),
    month: Joi.string().required(),
  },
});


export const deleteExamsMiddleware = celebrate({
  [Segments.PARAMS]: {
    examId: Joi.string().uuid().required(),
  },
});

export const showExamsMiddleware = celebrate({
  [Segments.PARAMS]: {
    patient_id: Joi.string().uuid().required(),
  },
});


export const updateExamsMiddleware = celebrate({
  [Segments.PARAMS]: {
    examId: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    name: Joi.string(),
    hour: Joi.string(),
    day: Joi.string(),
    month: Joi.string(),
  },
});

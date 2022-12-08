import { celebrate, Segments, Joi } from "celebrate";

export const createExamsMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    hour: Joi.string().required(),
    day: Joi.string().required(),
    month: Joi.string().required(),
    [Segments.PARAMS]: {
      client_id: Joi.string().uuid().required(),
    },

  },
});


export const deleteExamsMiddleware = celebrate({
  [Segments.PARAMS]: {
    examId: Joi.string().uuid().required(),
  },
});

export const showExamsMiddleware = celebrate({
  [Segments.PARAMS]: {
    examId: Joi.string().uuid().required(),
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

import { celebrate, Segments, Joi } from "celebrate";

export const createPatientMenuMiddleware = celebrate({
    [Segments.PARAMS]: {
        patientId: Joi.string().uuid().required(),
      },
  [Segments.BODY]: {
    dayofweek: Joi.string().required(),
    description: Joi.string().required(),
    hour: Joi.string().required(),
  },
});

export const deletePatientMenuMiddleware = celebrate({
    [Segments.PARAMS]: {
        patientMenuId: Joi.string().uuid().required(),
      },
});

export const updatePatientMenuMiddleware = celebrate({
    [Segments.PARAMS]: {
        patientMenuId: Joi.string().uuid().required(),
      },
  [Segments.BODY]: {
    dayofweek: Joi.string().required(),
    description: Joi.string().required(),
    hour: Joi.string().required(),
  },
});

export const listPatientMenuMiddleware = celebrate({
    [Segments.PARAMS]: {
        patientId: Joi.string().uuid().required(),
      },
});

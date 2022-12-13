import { celebrate, Segments, Joi } from "celebrate";

export const createPhysicalActivityMiddleware = celebrate({
    [Segments.PARAMS]: {
        client_id: Joi.string().uuid().required(),
      },
  [Segments.BODY]: {
    description: Joi.string().required(),
    repetitions: Joi.string().required(),
    series: Joi.string().required(),
    type: Joi.string().required(),
  },
});

export const deletePhysicalActivityMiddleware = celebrate({
    [Segments.PARAMS]: {
        physicalActivityId: Joi.string().uuid().required(),
    },
});

export const updatePhysicalActivityMiddleware = celebrate({
    [Segments.PARAMS]: {
        physicalActivityId: Joi.string().uuid().required(),
    },
  [Segments.BODY]: {
    description: Joi.string(),
    repetitions: Joi.string(),
    series: Joi.string(),
    type: Joi.string(),
  },
});

export const listPhysicalActivityMiddleware = celebrate({
    [Segments.PARAMS]: {
        client_id: Joi.string().uuid().required(),
    },
});

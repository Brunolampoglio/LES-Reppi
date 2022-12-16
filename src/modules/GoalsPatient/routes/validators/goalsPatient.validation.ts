import { celebrate, Segments, Joi } from "celebrate";

export const createGoalsPatientMiddleware = celebrate({
  [Segments.PARAMS]:{
    patientId: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    typeofgoal: Joi.string().required(),
    from: Joi.string().required(),
    to: Joi.string().required(),
    description: Joi.string().required(),
    points: Joi.number().required(),
  },
});

export const listGoalsPatientMiddleware = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(50),
  },
  [Segments.PARAMS]:{
    patientId: Joi.string().uuid().required(),
  },
});

export const updateGoalsPatientMiddleware = celebrate({
  [Segments.PARAMS]:{
    goals_id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    typeofgoal: Joi.string(),
    from: Joi.string(),
    to: Joi.string(),
    description: Joi.string(),
    points: Joi.number(),
  },
});

export const deleteGoalsPatientMiddleware = celebrate({
  [Segments.PARAMS]:{
    goals_id: Joi.string().uuid().required(),
  },
});

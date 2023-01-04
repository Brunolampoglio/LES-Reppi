import { celebrate, Segments, Joi } from "celebrate";

export const createSolicitaionMiddleware = celebrate({
  [Segments.PARAMS]: {
    awards_id: Joi.string().uuid().required(),
  },
});

export const deleteSolicitationMiddleware = celebrate({
  [Segments.PARAMS]: {
    solicitation_id: Joi.string().uuid().required(),
  },
});

export const updateSolicitationMiddleware = celebrate({
  [Segments.PARAMS]: {
    solicitation_id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    status: Joi.string().required(),
  },
});


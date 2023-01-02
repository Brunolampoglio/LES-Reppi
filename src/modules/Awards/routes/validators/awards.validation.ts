import { celebrate, Segments, Joi } from "celebrate";

export const createAwardsMiddleware = celebrate({
  [Segments.BODY]: {
    description: Joi.string().required(),
    points: Joi.number().required(),
  },
});

export const listAwardsMiddleware = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(50),
  },
});

export const updateAwardsMiddleware = celebrate({
  [Segments.PARAMS]:{
    awardsId: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    description: Joi.string(),
    points: Joi.number(),
  },
});


export const deleteAwardsMiddleware = celebrate({
  [Segments.PARAMS]:{
    awardsId: Joi.string().uuid().required(),
  },
});

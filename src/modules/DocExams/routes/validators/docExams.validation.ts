import { celebrate, Segments, Joi } from "celebrate";

export const createDocExamsMiddleware = celebrate({
  [Segments.PARAMS]:{
    patientId: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    name: Joi.string().required(),
    specialty: Joi.string().required(),
  },
});

export const listDocExamsMiddleware = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(50),
  },
  [Segments.PARAMS]:{
    patientId: Joi.string().uuid().required(),
  },
});

export const updateDocExamsMiddleware = celebrate({
  [Segments.PARAMS]:{
    docexam_id: Joi.string().uuid().required(),
  },
});

export const deleteDocExamsMiddleware = celebrate({
  [Segments.PARAMS]:{
    docexam_id: Joi.string().uuid().required(),
  },
});

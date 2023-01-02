import { celebrate, Segments, Joi } from "celebrate";

export const createPrescriptionMiddleware = celebrate({
  [Segments.PARAMS]:{
    patient_id: Joi.string().uuid().required(),
  },
});

export const listPrescriptionMiddleware = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(50),
  },
  [Segments.PARAMS]:{
    patient_id: Joi.string().uuid().required(),
  },
});


export const updatePrescriptionMiddleware = celebrate({
  [Segments.PARAMS]:{
    prescription_id: Joi.string().uuid().required(),
  },
});

export const deletePrescriptionMiddleware = celebrate({
  [Segments.PARAMS]:{
    prescription_id: Joi.string().uuid().required(),
  },
});


import { celebrate, Segments, Joi } from "celebrate";

export const createCertificateMiddleware = celebrate({
  [Segments.PARAMS]:{
    user_id: Joi.string().uuid().required(),
  },
});

export const listCertificateMiddleware = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(50),
  },
  [Segments.PARAMS]:{
    user_id: Joi.string().uuid().required(),
  },
});

export const updateCertificateMiddleware = celebrate({
  [Segments.PARAMS]:{
    certificate_id: Joi.string().uuid().required(),
  },
});

export const deleteCertificateMiddleware = celebrate({
  [Segments.PARAMS]:{
    certificate_id: Joi.string().uuid().required(),
  },
});


import { celebrate, Joi, Segments } from 'celebrate';

export const createBannerMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    link_banner: Joi.string().required(),
    link_image: Joi.string().required(),
    image: Joi.string().required(),
    dt_Initial: Joi.date().required(),
    dt_Final: Joi.date().required(),
  },
});

export const updateBannerMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    link_banner: Joi.string(),
    link_image: Joi.string(),
    image: Joi.string(),
    dt_Initial: Joi.date(),
    dt_Final: Joi.date(),
  },
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showBannerMiddleware = celebrate({
  [Segments.PARAMS]: {
    id_banner: Joi.string().uuid().required(),
  },
});

export const deleteBannerMiddleware = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

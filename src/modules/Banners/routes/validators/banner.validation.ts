import { celebrate, Joi, Segments } from 'celebrate';

export const createBannerMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    link_banner: Joi.string().required(),
    link_image: Joi.string().required(),
    image: Joi.string().required(),
  },
});

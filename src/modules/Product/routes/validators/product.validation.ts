import { celebrate, Joi, Segments } from 'celebrate';

export const createProductMiddleware = celebrate({
  [Segments.BODY]: {
    title: Joi.string().required(),
    author: Joi.string().required(),
    category: Joi.string().required(),
    image_url: Joi.string().required(),
    language: Joi.string().required(),
    bar_code: Joi.string().required(),
    year: Joi.string().required(),
    pages_quantity: Joi.number().required(),
    isbn: Joi.string().required(),
    value: Joi.number().required(),
    publishing_company: Joi.string().required(),
    edition: Joi.string().required(),
    dimensions: Joi.string().required(),
    weight_in_grams: Joi.number().required(),
    synopsis: Joi.string().required(),
    stock_units: Joi.number().required(),
    is_available: Joi.boolean().required(),
  },
});

export const updateProductMiddleware = celebrate({
  [Segments.BODY]: {
    title: Joi.string().required(),
    author: Joi.string().required(),
    category: Joi.string().required(),
    image_url: Joi.string().required(),
    language: Joi.string().required(),
    bar_code: Joi.string().required(),
    year: Joi.string().required(),
    pages_quantity: Joi.number().required(),
    isbn: Joi.string().required(),
    value: Joi.number().required(),
    publishing_company: Joi.string().required(),
    edition: Joi.string().required(),
    dimensions: Joi.string().required(),
    weight_in_grams: Joi.number().required(),
    synopsis: Joi.string().required(),
  },
});

export const updateAvailableProductMiddleware = celebrate({
  [Segments.BODY]: {
    is_available: Joi.boolean().required(),
  },
});

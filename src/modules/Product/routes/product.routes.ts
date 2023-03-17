import { Router } from 'express';
import { ProductController } from '../controllers/Product.controller';
import { createProductMiddleware } from './validators/product.validation';

const productRouter = Router();

const productController = new ProductController();

productRouter.post('/', createProductMiddleware, productController.create);

productRouter.get('/', productController.index);

productRouter.delete('/:product_id', productController.delete);

export { productRouter };

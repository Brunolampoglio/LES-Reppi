import { Router } from 'express';
import { verifyToken } from '@shared/middleware/verifyToken';
import { CartController } from '../controllers/Cart.controllers';
import {
  createCartMiddleware,
  deleteCartMiddleware,
  updateCartMiddleware,
} from './validators/cart.validation';

const cartRouter = Router();

const cartController = new CartController();

cartRouter.use(verifyToken);

cartRouter.post('/', createCartMiddleware, cartController.create);

cartRouter.get('/', cartController.index);

cartRouter.put('/:cart_id', updateCartMiddleware, cartController.update);

cartRouter.get('/show', cartController.findByName);

cartRouter.get('/:cart_id', cartController.show);

cartRouter.patch('/status/:cart_id', cartController.updateStatus);

cartRouter.delete('/:cart_id', deleteCartMiddleware, cartController.delete);

export { cartRouter };

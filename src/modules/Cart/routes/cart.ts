import { Router } from 'express';
import { verifyToken } from '@shared/middleware/verifyToken';
import { CartController } from '../controllers/Cart.controllers';
import {
  createCartMiddleware,
  deleteCartMiddleware,
  removeItemCartMiddleware,
  updateCartMiddleware,
} from './validators/cart.validation';

const cartRouter = Router();

const cartController = new CartController();

cartRouter.use(verifyToken);

cartRouter.post('/', createCartMiddleware, cartController.create);

cartRouter.get('/', cartController.index);

cartRouter.put('/:cart_id', updateCartMiddleware, cartController.update);

cartRouter.put(
  '/remove-item/:cart_id',
  removeItemCartMiddleware,
  cartController.removeItem,
);

cartRouter.get('/show', cartController.findByName);

cartRouter.get('/:cart_id', cartController.show);

cartRouter.delete('/:cart_id', deleteCartMiddleware, cartController.delete);

export { cartRouter };

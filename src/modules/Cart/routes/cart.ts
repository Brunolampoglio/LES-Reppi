import { Router } from 'express';
import { verifyToken } from '@shared/middleware/verifyToken';
import { CartController } from '../controllers/Cart.controllers';
import {
  createCartMiddleware,
  removeItemCartMiddleware,
  updateCartMiddleware,
} from './validators/cart.validation';

const cartRouter = Router();

const cartController = new CartController();

cartRouter.use(verifyToken);

cartRouter.post('/', createCartMiddleware, cartController.create);

cartRouter.get('/', cartController.index);

cartRouter.put('/:cart_id/add', updateCartMiddleware, cartController.updateAdd);

cartRouter.put(
  '/:cart_id/remove',
  updateCartMiddleware,
  cartController.updateRemove,
);

cartRouter.put(
  '/remove-item/:cart_id',
  removeItemCartMiddleware,
  cartController.removeItem,
);

export { cartRouter };

import { Router } from 'express';
import { CouponController } from '../controllers/Coupon.controllers';
import {
  createCouponMiddleware,
  deleteCouponMiddleware,
  updateCouponMiddleware,
} from './validators/coupon.validation';

const couponRouter = Router();

const cuponController = new CouponController();

couponRouter.post('/', createCouponMiddleware, cuponController.create);

couponRouter.get('/', cuponController.index);

couponRouter.get('/show', cuponController.findByName);

couponRouter.get('/:coupon_id', cuponController.show);

couponRouter.put('/:coupon_id', updateCouponMiddleware, cuponController.update);

couponRouter.patch('/status/:coupon_id', cuponController.updateStatus);

couponRouter.delete(
  '/:coupon_id',
  deleteCouponMiddleware,
  cuponController.delete,
);

export { couponRouter };

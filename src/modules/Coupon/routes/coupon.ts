import { Router } from 'express';
import { CouponController } from '../controllers/Coupon.controllers';
import {
  createCouponMiddleware,
  deleteCouponMiddleware,
  updateCouponMiddleware,
} from './validators/coupon.validation';

const couponRouter = Router();

const couponController = new CouponController();

couponRouter.post('/', createCouponMiddleware, couponController.create);

couponRouter.get('/', couponController.index);

couponRouter.get('/show', couponController.findByName);

couponRouter.get('/:coupon_id', couponController.show);

couponRouter.put(
  '/:coupon_id',
  updateCouponMiddleware,
  couponController.update,
);

couponRouter.patch('/status/:coupon_id', couponController.updateStatus);

couponRouter.delete(
  '/:coupon_id',
  deleteCouponMiddleware,
  couponController.delete,
);

export { couponRouter };

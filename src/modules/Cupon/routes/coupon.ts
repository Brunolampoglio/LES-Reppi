import { Router } from 'express';
import { CouponController } from '../controllers/Coupon.controllers';

const couponRouter = Router();

const cuponController = new CouponController();

couponRouter.post('/', cuponController.create);

couponRouter.get('/', cuponController.index);

couponRouter.get('/:coupon_id', cuponController.show);

couponRouter.put('/:coupon_id', cuponController.update);

couponRouter.patch('/status/:coupon_id', cuponController.updateStatus);

couponRouter.delete('/:coupon_id', cuponController.delete);

export { couponRouter };

import { Router } from 'express';
import { CuponController } from '../controllers/Cupon.controllers';

const cuponRouter = Router();

const cuponController = new CuponController();

cuponRouter.post('/', cuponController.create);

cuponRouter.get('/', cuponController.index);

cuponRouter.put('/:cupon_id', cuponController.update);

cuponRouter.delete('/:cupon_id', cuponController.delete);

export { cuponRouter };

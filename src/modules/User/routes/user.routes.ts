import { Router } from 'express';
import { UserController } from '../controllers/User.controller';
import { sessionRouter } from './session.routes';
import {
  createUserMiddleware,
  getUserMiddleware,
  updateUserMiddleware,
  updateUserStatusMiddleware,
} from './validators/user.validation';

const userRouter = Router();

const userController = new UserController();

userRouter.use('/session', sessionRouter);

userRouter.post('/', createUserMiddleware, userController.create);

userRouter.get('/', userController.index);

userRouter.get('/:id', getUserMiddleware, userController.findById);

userRouter.put('/:id', updateUserMiddleware, userController.update);

userRouter.put(
  '/status/:id',
  updateUserStatusMiddleware,
  userController.updateStatus,
);

userRouter.delete('/:user_id', userController.delete);

export { userRouter };

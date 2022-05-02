import { Router } from 'express';
import { UserController } from '../controllers/User.controller';
import { createUserMiddleware } from './validators/createUser';

const userRouter = Router();

const userController = new UserController();

userRouter.post('/user', createUserMiddleware, userController.create);

export { userRouter };

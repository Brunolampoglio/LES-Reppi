import { Router } from "express";
import { UserController } from "../controllers/User.controller";
import { createUserMiddleware, deleteUserMiddleware, getUserMiddleware, updateUserMiddleware, updateUserStatusMiddleware } from "./validators/user.validation";

const userRouter = Router();

const userController = new UserController();

userRouter.post('/', createUserMiddleware, userController.create);

userRouter.get('/', userController.index);

userRouter.get('/:id', getUserMiddleware, userController.findById);

userRouter.put('/:id', updateUserMiddleware, userController.update);

userRouter.put('/status/:id', updateUserStatusMiddleware, userController.updateStatus);

userRouter.delete('/:id', deleteUserMiddleware, userController.delete);

export { userRouter };
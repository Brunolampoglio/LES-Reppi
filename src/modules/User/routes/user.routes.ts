import { Router } from 'express';
import multer from 'multer';
import { uploadConfig } from '@config/upload';
import { verifyToken } from '@shared/middleware/verifyToken';
import { UserController } from '../controllers/User.controller';
import { UserAvatarController } from '../controllers/UserAvatar.controller';
import { passwordRouter } from './password.routes';
import { sessionRouter } from './session.routes';
import {
  createUserMiddleware,
  deleteUserAvatarMiddleware,
  deleteUserMiddleware,
  showUserMiddleware,
  updateStatusMiddleware,
  updateUserAvatarMiddleware,
  updateUserMiddleware,
} from './validators/user.validation';

const userRouter = Router();

const userController = new UserController();
const userAvatarController = new UserAvatarController();

const uploadMulter = multer(uploadConfig.multer);

userRouter.use('/password', passwordRouter);

userRouter.use('/session', sessionRouter);

userRouter.post('/', createUserMiddleware, userController.create);
userRouter.post('/confirm', userController.confirm);

userRouter.use(verifyToken);

userRouter.post('/gestor', createUserMiddleware, userController.createByGestor);
userRouter.post('/employee', createUserMiddleware, userController.createByGestor);

userRouter.patch(
  '/:user_id/avatar',
  updateUserAvatarMiddleware,
  uploadMulter.single('avatar'),
  userAvatarController.update,
);

userRouter.get('/', userController.listUser);
userRouter.get('/gestor', userController.listGestor);
userRouter.get('/employee/:gestor_id', userController.listEmployeeByGestor);

userRouter.delete(
  '/:user_id/avatar',
  deleteUserAvatarMiddleware,
  userAvatarController.delete,
);

userRouter.get('/:user_id', showUserMiddleware, userController.show);

userRouter.put('/:user_id', updateUserMiddleware, userController.update);
userRouter.put('/status/:user_id', updateStatusMiddleware, userController.updateStatus);

userRouter.delete('/:user_id', deleteUserMiddleware, userController.delete);

export { userRouter };

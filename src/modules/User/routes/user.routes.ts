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


userRouter.use(verifyToken);

userRouter.patch(
  '/:user_id/avatar',
  updateUserAvatarMiddleware,
  uploadMulter.single('avatar'),
  userAvatarController.update,
);

userRouter.get('/listar', userController.listUser);



userRouter.delete(
  '/:user_id/avatar',
  deleteUserAvatarMiddleware,
  userAvatarController.delete,
);

userRouter.get('/:user_id', showUserMiddleware, userController.show);

userRouter.put('/:user_id', updateUserMiddleware, userController.update);

userRouter.delete('/:user_id', deleteUserMiddleware, userController.delete);

export { userRouter };

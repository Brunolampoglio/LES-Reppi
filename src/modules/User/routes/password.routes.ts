import { Router } from 'express';

import { PasswordController } from '@modules/User/controllers/Password.controller';
import { ensureAuthenticated } from '@shared/middleware/ensureAuthenticated';
import {
  changePasswordMiddleware,
  forgotPasswordMiddleware,
  resetPasswordMiddleware,
} from './validators/password.validation';

const passwordRouter = Router();
const passwordController = new PasswordController();

passwordRouter.post(
  '/forgot',
  forgotPasswordMiddleware,
  passwordController.forgot,
);

passwordRouter.post(
  'rest/:token',
  resetPasswordMiddleware,
  passwordController.reset,
);

passwordRouter.use(ensureAuthenticated);

passwordRouter.post(
  'change/user_id',
  changePasswordMiddleware,
  passwordController.change,
);

export { passwordRouter };

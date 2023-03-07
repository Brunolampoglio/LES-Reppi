import { Router } from 'express';
import { SessionController } from '../controllers/Session.controller';
import { createSessionMiddleware } from './validators/session.validation';

const sessionRouter = Router();

const sessionController = new SessionController();

sessionRouter.post('/', createSessionMiddleware, sessionController.create);


export { sessionRouter };

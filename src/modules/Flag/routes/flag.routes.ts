import { Router } from 'express';
import { FlagController } from '../controllers/Flag.controller';
import { createFlagMiddleware } from './validators/flag.validation';

const flagRouter = Router();

const flagController = new FlagController();

flagRouter.post('/', createFlagMiddleware, flagController.create);

flagRouter.get('/', flagController.index);

flagRouter.delete('/:flag_id', flagController.delete);

export { flagRouter };

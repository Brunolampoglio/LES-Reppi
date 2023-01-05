import { verifyToken } from '@shared/middleware/verifyToken';
import { Router } from 'express';
import { PlansController } from '../controllers/Plan.controller';
import {
  createPlanMiddleware,
  deletePlanMiddleware,
  updatePlanMiddleware,
} from './validators/plans.validation';

const planRouter = Router();
const planController = new PlansController();

planRouter.get('/:id', planController.show);
planRouter.get('/', planController.list);

planRouter.use(verifyToken);
planRouter.post('/', createPlanMiddleware, planController.create);

planRouter.delete('/:id', deletePlanMiddleware, planController.delete);
planRouter.put('/:id', updatePlanMiddleware, planController.update);

export { planRouter };

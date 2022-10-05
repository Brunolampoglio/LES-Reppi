import { Router } from 'express';
import { PlansController } from '../controllers/Plan.controller';
import { createPlanMiddleware } from './validators/plans.validation';

const planRouter = Router();
const planController = new PlansController();

planRouter.post('/', createPlanMiddleware, planController.create);

export { planRouter };

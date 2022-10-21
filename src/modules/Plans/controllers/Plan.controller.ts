import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreatePlanService } from '../services/CreatePlan.service';
import { ListAllPlansService } from '../services/ListAllPlans.service';

class PlansController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, description, price, recurrence, qtd_access } = req.body;

    const createPlanService = container.resolve(CreatePlanService);

    const plan = await createPlanService.execute({
      name,
      description,
      price,
      recurrence,
      qtd_access,
    });

    return res.status(201).json(plan);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.query as {
      [key: string]: string;
    };
    const listPlansService = container.resolve(ListAllPlansService);

    const plans = await listPlansService.execute({
      user_id: req.user.id,
      limit: parseInt(limit, 10) || 50,
      page: parseInt(page, 10) || 1,
    });

    return res.status(200).json(plans);
  }
}
export { PlansController };

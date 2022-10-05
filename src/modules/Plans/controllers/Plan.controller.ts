import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreatePlanService } from '../services/CreatePlan.service';

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
}
export { PlansController };

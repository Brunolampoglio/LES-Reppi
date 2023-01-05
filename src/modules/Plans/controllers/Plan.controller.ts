import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreatePlanService } from '../services/CreatePlan.service';
import { ListAllPlansService } from '../services/ListAllPlans.service';
import { DeletePlanService } from '../services/DeletePlan.service';
import { UpdatePlanService } from '../services/UpdatePlan.service';
import { ShowPlanService } from '../services/Showplan.service';

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
      user_id: req.user.id,
      isMaster: req.user.isMaster,
    });

    return res.status(201).json(plan);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showPlanService = container.resolve(ShowPlanService);

    const plan = await showPlanService.execute({ id });

    return res.status(200).json(plan);

  }


  async list(req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.query as {
      [key: string]: string;
    };
    const listPlansService = container.resolve(ListAllPlansService);

    const plans = await listPlansService.execute({
      limit: parseInt(limit, 10) || 50,
      page: parseInt(page, 10) || 1,
    });

    return res.status(200).json(plans);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deletePlanService = container.resolve(DeletePlanService);

    await deletePlanService.execute({ id, isMaster: req.user.isMaster });

    return res.status(204).send();
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, description, price, recurrence, qtd_access } = req.body;

    const updatePlanService = container.resolve(UpdatePlanService);

    const plan = await updatePlanService.execute({
      id,
      name,
      description,
      price,
      recurrence,
      qtd_access,
      isMaster: req.user.isMaster,
    });

    return res.status(200).json(plan);
  }
}
export { PlansController };

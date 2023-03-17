import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateFlagService } from '../services/CreateFlag.service';
import { DeleteFlagService } from '../services/DeleteFlag.service';
import { GetFlagService } from '../services/GetFlag.service';

class FlagController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    const createFlagController = container.resolve(CreateFlagService);

    const flag = await createFlagController.execute({ name });

    return res.json(flag);
  }

  async index(req: Request, res: Response) {
    const getFlagController = container.resolve(GetFlagService);

    const flag = await getFlagController.execute();

    return res.json(flag);
  }

  async delete(req: Request, res: Response) {
    const { flag_id } = req.params;

    const deleteFlagController = container.resolve(DeleteFlagService);

    await deleteFlagController.execute(flag_id);

    return res.status(204).send();
  }
}
export { FlagController };

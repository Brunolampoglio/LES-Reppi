import { CreateAwardsService } from "../services/CreateAwards.service";
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ListAwardsService } from "../services/ListAwards.service";
import { UpdateAwardsService } from "../services/UpdateAwards.service";
import { DeleteAwardsService } from "../services/DeleteAwards.service";
class AwardsController {
  async create(req: Request, res: Response): Promise<Response> {
    const {description, points} = req.body;
    const { patient_id } = req.params;

    const createAwardsService = container.resolve(CreateAwardsService);

    const awards = await createAwardsService.execute({
      description,
      points,
      client_id: patient_id,
    });
    return res.status(201).json(awards);
  }

  async list (req: Request, res: Response): Promise<Response> {
    const { page, limit} = req.query as {
      [key: string]: string;
    };

    const {patient_id} = req.params;

    const listAwardsService = container.resolve(ListAwardsService);

    const awards = await listAwardsService.execute({
      client_id: patient_id,
      limit: parseInt(limit, 10) || 50,
      page: parseInt(page, 10) || 1,
    });

    return res.json(awards);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { awards_id } = req.params;
    const { description, points } = req.body;

    const updateAwardsService = container.resolve(UpdateAwardsService);

    const awards = await updateAwardsService.execute({
      id: awards_id,
      client_id: req.user.id,
      description,
      points,
    });

    return res.json(awards);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { awards_id } = req.params;

    const deleteAwardsService = container.resolve(DeleteAwardsService);

    await deleteAwardsService.execute({
      id: awards_id,
      client_id: req.user.id,
    });

    return res.status(204).send();
  }

}
export { AwardsController };

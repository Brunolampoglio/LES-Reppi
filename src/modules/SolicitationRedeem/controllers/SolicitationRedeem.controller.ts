import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateSolicitationService } from '../services/CreateSolicitation.service';
import { ListAllSolicitationService } from '../services/ListAllSolicitation.service';
import { DeleteSolicitationService } from '../services/DeleteSolicitation.service';
import { UpdateSolicitationService } from '../services/UpdateSolicitation.service';

class SolicitationController {
  async create(request: Request, response: Response): Promise<Response> {
    const { awards_id} = request.params;

    const createSolicitationService = container.resolve(CreateSolicitationService);

    const solicitation = await createSolicitationService.execute({
      awards_id,
      patient_id: request.user.id,
    });

    return response.status(201).json(solicitation);

  }

  async list(request: Request, response: Response): Promise<Response> {
    const { page, limit } = request.query as {
      [key: string]: string;
    };
    const listSolicitationService = container.resolve(ListAllSolicitationService);

    const solicitation = await listSolicitationService.execute({
      gestor_id: request.user.id,

    });

    return response.status(200).json(solicitation);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSolicitationService = container.resolve(DeleteSolicitationService);

    await deleteSolicitationService.execute({ solicitation_id: id });

    return response.status(204).json();
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { status } = request.body;

    const updateSolicitationService = container.resolve(UpdateSolicitationService);

    const solicitation = await updateSolicitationService.execute({
      solicitation_id: id,
      status,
    });

    return response.status(200).json(solicitation);
  }


}
export { SolicitationController };

import { AppError } from '@shared/error/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateGoalsPatientService } from '../services/CreateGoalsPatient.service';
import { DeleteGoalsPatientService } from '../services/DeleteGoalsPatient.service';
import { ListGoalsPatientService } from '../services/ListGoalsPatient.service';
import { UpdateGoalsPatientService } from '../services/UpdateGoalsPatient.service';

class GoalsPatientController {
  async create(req: Request, res: Response): Promise<Response> {
    const { typeofgoal, from, to, description, points, type} = req.body;
    const { patientId } = req.params;

    const createGoalsPatientService = container.resolve(CreateGoalsPatientService);

    const goalsPatient = await createGoalsPatientService.execute({
      typeofgoal,
      from,
      to,
      description,
      points,
      patient_id: patientId,
      type,
});

    return res.status(201).json(goalsPatient);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.query as {
      [key: string]: string;
    };
    const { patientId } = req.params;
    const listGoalsPatientService = container.resolve(ListGoalsPatientService);

    const goalsPatient = await listGoalsPatientService.execute({
      patient_id: patientId,
      limit: parseInt(limit, 10) || 50,
      page: parseInt(page, 10) || 1,
    });

    return res.json(goalsPatient);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { goals_id } = req.params;
    const { status } = req.body;

    const updateGoalsPatientService = container.resolve(UpdateGoalsPatientService);

    const goalsPatient = await updateGoalsPatientService.execute({
      goals_id,
      status,

    });

    return res.json(goalsPatient);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { goals_id } = req.params;

    const deleteGoalsPatientService = container.resolve(DeleteGoalsPatientService);

    await deleteGoalsPatientService.execute({
      goals_id,
    });

    return res.status(204).send();
  }
}

export { GoalsPatientController };

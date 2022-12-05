import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreatePatientDataService } from '../services/CreatePatientData.service';

class PatientDataController {

  async create(req: Request, res: Response): Promise<Response> {
    const { colesterol, creatinina, hemoglobina_glicada, peso, descricao } =
      req.body;

    const createPatientDataService = container.resolve(CreatePatientDataService);

    const patientData = await createPatientDataService.execute({
      colesterol,
      creatinina,
      hemoglobina_glicada,
      peso,
      descricao,
      user_id: req.user.id,
    });

    return res.status(201).json(patientData);
  }
}

export { PatientDataController };

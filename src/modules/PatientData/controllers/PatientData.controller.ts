import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreatePatientDataService } from '../services/CreatePatientData.service';
import { DeletePatientDataService } from '../services/DeletePatientData.service';
import { ListPatientDataService } from '../services/ListPatientData.service';
import { UpdatePatientDataService } from '../services/UpdatePatientData.service';

class PatientDataController {

  async create(req: Request, res: Response): Promise<Response> {
    const { colesterol, creatinina, hemoglobina_glicada, peso, descricao } =
      req.body;

      const { patientId } = req.params

    const createPatientDataService = container.resolve(CreatePatientDataService);



    const patientData = await createPatientDataService.execute({
      colesterol,
      creatinina,
      hemoglobina_glicada,
      peso,
      descricao,
      user_id: patientId,
    });

    return res.status(201).json(patientData);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { patientDataId } = req.params;


    const deletePatientDataService = container.resolve(DeletePatientDataService);

    await deletePatientDataService.execute({
      patientDataId,
    });

    return res.status(204).json();
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { patientDataId } = req.params;
    const { colesterol, creatinina, hemoglobina_glicada, peso, descricao } =
      req.body;

    const updatePatientDataService = container.resolve(UpdatePatientDataService);

    const patientData = await updatePatientDataService.execute({
      patientDataId,
      colesterol,
      creatinina,
      hemoglobina_glicada,
      peso,
      descricao,
    });

    return res.status(200).json(patientData);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { patientId } = req.params;

    const listPatientDataService = container.resolve(ListPatientDataService);

    const patientData = await listPatientDataService.execute({
      patientId,
    });

    return res.status(200).json(patientData);
  }

}

export { PatientDataController };

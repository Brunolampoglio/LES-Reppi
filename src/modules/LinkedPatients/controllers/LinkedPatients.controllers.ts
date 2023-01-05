import { container } from "tsyringe";
import { Request, Response } from 'express';
import { CreateLinkedPatientsService } from "../services/CreateLinkedPatients.service";
import { AppError } from "@shared/error/AppError";
import { ListLinkedPatientService } from "../services/ListLinkedPatient.service";
import { ListByNameLinkedPatientService } from "../services/ListByNameLinkedPatients.service";

class LinkedPatientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    if (!request.file) {
      throw new AppError('Nenhum arquivo enviado', 400);
    }

    const { filename } = request.file;

    const createLinkedPatient = container.resolve(CreateLinkedPatientsService);

    const linkedPatient = await createLinkedPatient.execute({
     gestor_id: request.user.id,
     anexo: filename,
    });

    return response.json(linkedPatient);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listLinkedPatientsService = container.resolve(ListLinkedPatientService);
    const { page, limit, role } = request.query as {
      [key: string]: string;
    };

    const linkedPatients = await listLinkedPatientsService.execute({
      gestor_id: request.user.id,
      limit: parseInt(limit, 10) || 50,
      page: parseInt(page, 10) || 1,
    });

    return response.json(linkedPatients);
  }

  public async listByName(request: Request, response: Response): Promise<Response> {
    const { name } = request.query as {
      [key: string]: string;
    };

    const linkedsPatients = await container.resolve(ListByNameLinkedPatientService).execute({
      gestor_id: request.user.id,
      name,
    });


    return response.json(linkedsPatients);
 }
}

export { LinkedPatientsController };

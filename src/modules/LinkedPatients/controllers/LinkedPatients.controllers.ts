import { container } from "tsyringe";
import { Request, Response } from 'express';
import { CreateLinkedPatientsService } from "../services/CreateLinkedPatients.service";
import { AppError } from "@shared/error/AppError";

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

}

export { LinkedPatientsController };

import { AppError } from "@shared/error/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePrescriptionService } from "../services/CreatePrescription.service";
import { DeletePrescriptionService } from "../services/DeletePrescription.service";
import { ListPrescriptionService } from "../services/ListPrescription.service";
import { UpdatePrescriptionService } from "../services/UpdatePrescription.service";


class PrescriptionController {
  async create (req: Request, res: Response): Promise<Response> {
    const { patient_id } = req.params;

    if (!req.file) throw new AppError('Arquivo não enviado');

    const { filename } = req.file;
    const createPrescriptionService = container.resolve(CreatePrescriptionService);

    const prescription = await createPrescriptionService.execute({
      patient_id,
      anexo: filename,
    });

    return res.json(prescription);
  }

async update (req: Request, res: Response): Promise<Response> {
    const { prescription_id } = req.params;

    if (!req.file) throw new AppError('Arquivo não enviado');

    const { filename } = req.file;
    const updatePrescriptionService = container.resolve(UpdatePrescriptionService);

    const prescription = await updatePrescriptionService.execute({
      prescription_id,
      anexo: filename,
    });

    return res.json(prescription);
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const { prescription_id } = req.params;

    const deletePrescriptionService = container.resolve(DeletePrescriptionService);

    await deletePrescriptionService.execute({
      prescription_id,
    });

    return res.status(204).send();
  }

  async list (req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.query as {
      [key: string]: string;
  };
  const { patient_id } = req.params;

  const listPrescriptionService = container.resolve(ListPrescriptionService);

  const prescriptions = await listPrescriptionService.execute({
    patient_id,
    limit: parseInt(limit, 10) || 50,
    page: parseInt(page, 10) || 1,
  });

return res.json(prescriptions);

  }

}

export { PrescriptionController };

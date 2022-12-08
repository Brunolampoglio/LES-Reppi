import { container } from "tsyringe";
import { CreateExamsService } from "../services/CreateExams.service";
import { Request, Response } from 'express';
import { DeleteExamsService } from "../services/DeleteExams.service";
import { ListExamsService } from "../services/ListExams.service";
import { UpdateExamsService } from "../services/UpdateExams.service";

class ExamsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, hour, day, month} = req.body;
    const { client_Id } = req.params;

    const createExamService = container.resolve(CreateExamsService);

    const exam = await createExamService.execute({
      name,
      hour,
      day,
      month,
      client_id: client_Id,
    });

    return res.status(201).json(exam);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { examId } = req.params;

    const deleteExamService = container.resolve(DeleteExamsService);

    await deleteExamService.execute({
      examId,
      isMaster: req.user.isMaster,
    });

    return res.status(204).json();
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { client_Id } = req.params;
    const { page, limit } = req.query as {
      [key: string]: string;
    };

    const listExamsService = container.resolve(ListExamsService);

    const exams = await listExamsService.execute({
      client_id: client_Id,
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 50,
    });

    return res.status(200).json(exams);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { examId } = req.params;
    const { name, hour, day, month, isMaster } = req.body;

    const updateExamsService = container.resolve(UpdateExamsService);

    const exam = await updateExamsService.execute({
      examId,
      name,
      hour,
      day,
      month,
      isMaster,
    });

    return res.status(200).json(exam);
  }
}

export { ExamsController };

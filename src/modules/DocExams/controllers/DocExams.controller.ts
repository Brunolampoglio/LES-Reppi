import { AppError } from "@shared/error/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateDocExamsService } from "../services/CreateDocExams.service";
import { DeleteDocExamsService } from "../services/DeleteDocExams.service";
import { ListDocExamsService } from "../services/ListDocExams.service";
import { UpdateDocExamsService } from "../services/UpdateDocExams.service";

class DocExamsController {
    async create(req: Request, res: Response): Promise<Response> {
        const { user_id } = req.params;
        const {name, specialty} = req.body;

        if (!req.file) throw new AppError('Arquivo não enviado');

        const { filename } = req.file;
        const createDocExamService = container.resolve(CreateDocExamsService);

        const docExam = await createDocExamService.execute({
            user_id,
            anexo: filename,
            name,
            specialty,
        });

        return res.json(docExam);
    }

    async list(req: Request, res: Response): Promise<Response> {
        const { page, limit } = req.query as {
            [key: string]: string;
        };
        const { user_id } = req.params;

        const listDocExamService = container.resolve(ListDocExamsService);

        const docExams = await listDocExamService.execute({
            user_id,
            limit: parseInt(limit, 10) || 50,
            page: parseInt(page, 10) || 1,

        });

        return res.json(docExams);

    }

    async update(req: Request, res: Response): Promise<Response> {
        const { docexam_id } = req.params;
        const {name, specialty} = req.body;

        if (!req.file) throw new AppError('Arquivo não enviado');

        const { filename } = req.file;
        const updateDocExamService = container.resolve(UpdateDocExamsService);

        const docExam = await updateDocExamService.execute({
            docexam_id,
            anexo: filename,
            name,
            specialty,
        });

        return res.json(docExam);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { docexam_id } = req.params;

        const deleteDocExamService = container.resolve(DeleteDocExamsService);

        await deleteDocExamService.execute({
            docexam_id,
        });

        return res.status(204).send();
    }


}
export { DocExamsController };

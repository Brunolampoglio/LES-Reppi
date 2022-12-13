import { AppError } from "@shared/error/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCertificateService } from "../services/CreateCertificate.service";
import { DeleteCertificateService } from "../services/DeleteCertificate.service";
import { ListCertificateService } from "../services/ListCertificate.service";
import { UpdateCertificateService } from "../services/UpdateCertificate.service";

class CertificateController{
    async create(req: Request, res: Response): Promise<Response> {
        const { user_id } = req.params;

        if (!req.file) throw new AppError('Foto não encontrada');

         const { filename } = req.file;
        const createCertificateService = container.resolve(CreateCertificateService);

        const certificate = await createCertificateService.execute({
            user_id,
            anexo: filename,
        });

        return res.json(certificate);
    }

    async list(req: Request, res: Response): Promise<Response> {
        const { page, limit } = req.query as {
            [key: string]: string;
        };
        const { user_id } = req.params;

        const listCertificateService = container.resolve(ListCertificateService);

        const certificates = await listCertificateService.execute({
            user_id,
            limit: parseInt(limit, 10) || 50,
            page: parseInt(page, 10) || 1,
        });

        return res.json(certificates);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { certificate_id } = req.params;

        if (!req.file) throw new AppError('Foto não encontrada');

        const { filename } = req.file;
        const createCertificateService = container.resolve(UpdateCertificateService);

        const certificate = await createCertificateService.execute({
            id: certificate_id,
            anexo: filename,
        });

        return res.json(certificate);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { certificate_id } = req.params;

        const deleteCertificateService = container.resolve(DeleteCertificateService);

        await deleteCertificateService.execute({
            id: certificate_id,
        });

        return res.status(204).send();
    }

}

export { CertificateController };

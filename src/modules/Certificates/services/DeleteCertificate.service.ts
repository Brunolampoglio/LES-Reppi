import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { ICertificateRepository } from "../repositories/CertificateRepositories.interface";
import { IDeleteCertificateDTO } from "./dto/DeleteCertificateDTO";

@injectable()
class DeleteCertificateService {
    constructor(
        @inject("CertificateRepository")
        private certificateRepository: ICertificateRepository,
    ) {}

    public async execute({
        id,
    }: IDeleteCertificateDTO): Promise<void> {


        const certificate = await this.certificateRepository.findBy({
            id
        });

        if (!certificate) throw new AppError("Certificado não encontrado", 404);

        await this.certificateRepository.remove(certificate);
    }
}

export { DeleteCertificateService };

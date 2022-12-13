import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { Certificate } from "../entities/Certificates";
import { ICertificateRepository } from "../repositories/CertificateRepositories.interface";
import { IUpdateCertificateDTO } from "./dto/UpdateCertificateDTO";

@injectable()
class UpdateCertificateService {
  constructor(
    @inject('CertificateRepository')
    private certificateRepository: ICertificateRepository,
  ) {}

  public async execute({
    anexo,
    id,
}: IUpdateCertificateDTO): Promise<Certificate> {

      const certificate = await this.certificateRepository.findBy({
        id,
      });

      if (!certificate) throw new AppError('Certificado não encontrado', 404);

      Object.assign(certificate, {
        anexo,
      });

      const newCertificate = await this.certificateRepository.save(certificate);

      return newCertificate;
    }


}

export { UpdateCertificateService };

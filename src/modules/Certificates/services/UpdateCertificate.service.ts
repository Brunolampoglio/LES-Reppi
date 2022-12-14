import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
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

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    anexo,
    id,
}: IUpdateCertificateDTO): Promise<Certificate> {

      const certificate = await this.certificateRepository.findBy({
        id,
      });

      if (!certificate) throw new AppError('Certificado não encontrado', 404);

      const anexoFileName = await this.storageProvider.saveFile(anexo);

      if (certificate.anexo) {
        await this.storageProvider.deleteFile(certificate.anexo);
      }

      certificate.anexo = anexoFileName;

      const newCertificate = await this.certificateRepository.save(certificate);

      return newCertificate;
    }


}

export { UpdateCertificateService };

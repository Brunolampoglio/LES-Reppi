import { AppError } from "@shared/error/AppError";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { inject, injectable } from "tsyringe";
import { Certificate } from "../entities/Certificates";
import { ICertificateRepository } from "../repositories/CertificateRepositories.interface";
import { IListCertificateDTO } from "./dto/ListCertificateDTO";

@injectable()
class ListCertificateService {
  constructor(
    @inject('CertificateRepository')
    private certificateRepository: ICertificateRepository,
  ) {}

  public async execute({ user_id, page, limit }: IListCertificateDTO): Promise<IPaginatedResponse<Certificate>> {

    const certificates = await this.certificateRepository.listBy({ filters: { user_id }, page, limit });

    if (!certificates) throw new AppError('Certificados não encontrados', 404);

    return {
      results: certificates.results,
      limit: certificates.limit,
      page: certificates.page,
      total: certificates.total,
    };
  }
}

export { ListCertificateService };

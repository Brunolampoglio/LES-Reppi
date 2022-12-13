import { IPaginatedRequestObri } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { getRepository } from "typeorm";
import { Repository } from "typeorm/repository/Repository";
import { Certificate } from "../entities/Certificates";
import { ICertificateRepository } from "./CertificateRepositories.interface";
import { ICertificateCreate } from "./dto/CertificateRepositoryDTO";

class CertificateRepository implements ICertificateRepository {
  private ormRepository: Repository<Certificate>;

  constructor() {
    this.ormRepository = getRepository(Certificate);
  }

  async findBy(filter: Partial<Certificate>): Promise<Certificate | undefined> {
    const certificate = await this.ormRepository.findOne(filter);

    return certificate;
  }

  public async listBy({
    page,
    limit ,
    filters,
  }: IPaginatedRequestObri<Certificate>): Promise<IPaginatedResponse<Certificate>> {
    const certificates = await this.ormRepository.find({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    const certificateTotal = await this.ormRepository.count(filters);

    return {
      results: certificates,
      total: certificateTotal,
      page,
      limit,
    };
  }

  public async show(id: string): Promise<IPaginatedResponse<Certificate>> {

    const certificates = await this.ormRepository.find(
      {
        where: {id},
      },
    );

    const certificateTotal = await this.ormRepository.count();

    return {
      results: certificates,
      total: certificateTotal,
      page: 1,
      limit: 10,
    };
  }

  create({
    data,
    user_id,
    anexo
  }: ICertificateCreate): Certificate {
    const certificate = this.ormRepository.create({
      data,
      user_id,
      anexo,
    });

    return certificate;
  }

  public async save(certificate: Certificate): Promise<Certificate> {
    const newCertificate = await this.ormRepository.save(certificate);

    return newCertificate;

  }

  public async remove(certificate: Certificate): Promise<void> {
    await this.ormRepository.remove(certificate);
  }

}

export { CertificateRepository };

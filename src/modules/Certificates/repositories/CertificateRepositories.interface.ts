import { IPaginatedRequestObri } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { Certificate } from "../entities/Certificates";
import { ICertificateCreate } from "./dto/CertificateRepositoryDTO";

interface ICertificateRepository {
  findBy(filter: Partial<Certificate>): Promise<Certificate | undefined>;
  listBy(
    filter: IPaginatedRequestObri<Certificate>,
  ): Promise<IPaginatedResponse<Certificate>>;
  show(id: string): Promise<IPaginatedResponse<Certificate>>;
  create(certificate: ICertificateCreate): Certificate;
  save(certificate: Certificate): Promise<Certificate>;
  remove(certificate: Certificate): Promise<void>;
}
export { ICertificateRepository };

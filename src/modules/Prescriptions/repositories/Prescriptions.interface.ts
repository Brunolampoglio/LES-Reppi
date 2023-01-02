import { IPaginatedRequest } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { Prescriptions } from "../entities/Prescriptions";
import { IPrescriptionCreate } from "./dto/PrescriptionDTO";

interface IPrescriptionsRepository {
  findBy(filter: Partial<Prescriptions>): Promise<Prescriptions | undefined>;
  listBy(filter: IPaginatedRequest<Prescriptions>): Promise<IPaginatedResponse<Prescriptions>>;
  create(prescription: IPrescriptionCreate): Prescriptions;
  save(prescription: Prescriptions): Promise<Prescriptions>;
  remove(prescription: Prescriptions): Promise<void>;
}
export { IPrescriptionsRepository };

import { IPaginatedRequestObri } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { LinkedPatients } from "../entities/LinkedPatients";
import { ILinkedPatientsCreate } from "./dto/LinkedPatientsRepositoryDTO";

interface ILinkedPatientsRepository {
  findBy(filter: Partial<LinkedPatients>): Promise<LinkedPatients | undefined>;
  listBy(
    filter: IPaginatedRequestObri<LinkedPatients>,
  ): Promise<IPaginatedResponse<LinkedPatients>>;

  index(): Promise<LinkedPatients[]>;
  create(linkedPatients: ILinkedPatientsCreate): LinkedPatients;
  save(linkedPatients: LinkedPatients): Promise<LinkedPatients>;
  saveMany(data: LinkedPatients[]): Promise<LinkedPatients[]>;
  remove(linkedPatients: LinkedPatients): Promise<void>;

  /** @param {string} name - Name Patient */
   /** @param {string} gestor_id - Id do Gestor */

  listByName(
    name: string,
    gestor_id: string,
  ): Promise<IPaginatedResponse<LinkedPatients>>;
}
export { ILinkedPatientsRepository };

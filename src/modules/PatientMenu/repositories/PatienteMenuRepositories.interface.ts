import { IPaginatedRequest } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { PatientMenu } from "../entities/PatientMenu";
import { IPatientMenuCreate } from "./dto/PatienteMenuDTO";

interface IPatientMenuRepository {
  findBy(filter: Partial<PatientMenu>): Promise<PatientMenu | undefined>;
  listBy(
    filter: IPaginatedRequest<PatientMenu>,
  ): Promise<IPaginatedResponse<PatientMenu>>;
  show(id: string): Promise<IPaginatedResponse<PatientMenu>>;
  create(patientMenu: IPatientMenuCreate): PatientMenu;
  save(patientMenu: PatientMenu | PatientMenu[]): Promise<PatientMenu>;
  remove(patientMenu: PatientMenu): Promise<void>;
}

export { IPatientMenuRepository };

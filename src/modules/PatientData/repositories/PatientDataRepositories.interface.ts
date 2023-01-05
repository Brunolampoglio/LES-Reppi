import { IPaginatedRequest } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { PatientData } from "../entities/PatientData";
import { IPatientDataCreate } from "./dto/PatientDataRepositoryDTO";

interface IPatientDataRepository {
  findBy(filter: Partial<PatientData>): Promise<PatientData | undefined>;
  listBy(
    filter: IPaginatedRequest<PatientData>,
  ): Promise<IPaginatedResponse<PatientData>>;
  show(id: string): Promise<IPaginatedResponse<PatientData>>;
  create(patientData: IPatientDataCreate): PatientData;
  save(patientData: PatientData): Promise<PatientData>;
  remove(patientData: PatientData): Promise<void>;
}

export { IPatientDataRepository };

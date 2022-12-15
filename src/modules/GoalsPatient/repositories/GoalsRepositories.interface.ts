import { IPaginatedRequest, IPaginatedRequestObri } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { GoalsPatient } from "../entities/GoalsPatient";
import { IGoalsCreate } from "./dto/GoalsRepositoryDTO";

interface IGoalsPatientRepository {
  findBy(filter: Partial<GoalsPatient>): Promise<GoalsPatient | undefined>;
  listBy(
    filter: IPaginatedRequest<GoalsPatient>,
  ): Promise<IPaginatedResponse<GoalsPatient>>;
  show(id: string): Promise<IPaginatedResponse<GoalsPatient>>;
  create(goals: IGoalsCreate): GoalsPatient;
  save(goals: GoalsPatient): Promise<GoalsPatient>;
  remove(goals: GoalsPatient): Promise<void>;

}

export { IGoalsPatientRepository };

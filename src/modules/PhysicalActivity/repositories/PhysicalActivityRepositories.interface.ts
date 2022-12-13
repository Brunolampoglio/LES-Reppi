import { IPaginatedRequest } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { PhysicalActivity } from "../entities/PhysicalActivity";
import { IPhysicalActivityCreate } from "./dto/PhysicalActivityDTO";

interface IPhysicalActivityRepository {
  findBy(filter: Partial<PhysicalActivity>): Promise<PhysicalActivity | undefined>;
  listBy(
    filter: IPaginatedRequest<PhysicalActivity>,
  ): Promise<IPaginatedResponse<PhysicalActivity>>;
  show(id: string): Promise<IPaginatedResponse<PhysicalActivity>>;
  create(physicalActivity: IPhysicalActivityCreate): PhysicalActivity;
  save(physicalActivity: PhysicalActivity): Promise<PhysicalActivity>;
  delete(physicalActivity: PhysicalActivity): Promise<void>;
}

export { IPhysicalActivityRepository };

import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { Plans } from '../entities/Plans';
import { IPlanCreate } from './dto/PlanRepositoryDTO';

interface IPlansRepository {
  findBy(filter: Partial<Plans>): Promise<Plans | undefined>;
  listBy(filter: IPaginatedRequest<Plans>): Promise<IPaginatedResponse<Plans>>;
  Show(id: string): Promise<Plans | undefined>;
  listAll(filter: IPaginatedRequest<Plans>): Promise<IPaginatedResponse<Plans>>;
  create(plan: IPlanCreate): Plans;
  save(plan: Plans): Promise<Plans>;
  remove(plan: Plans): Promise<void>;
}
export { IPlansRepository };

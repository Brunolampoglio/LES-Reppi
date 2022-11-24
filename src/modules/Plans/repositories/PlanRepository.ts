import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { getRepository, Repository } from 'typeorm';
import { Plans } from '../entities/Plans';
import { IPlanCreate } from './dto/PlanRepositoryDTO';
import { IPlansRepository } from './PlanRepositories.interface';

class PlanRepository implements IPlansRepository {
  private ormRepository: Repository<Plans>;

  constructor() {
    this.ormRepository = getRepository(Plans);
  }

  async findBy(filter: Partial<Plans>): Promise<Plans | undefined> {
    const plan = await this.ormRepository.findOne(filter);

    return plan;
  }

  async Show(id: string): Promise<Plans | undefined> {
    const plan = await this.ormRepository.findOne(id);

    return plan;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<Plans>): Promise<IPaginatedResponse<Plans>> {
    const [plans, plansTotal] = await this.ormRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      results: plans,
      total: plansTotal,
      page,
      limit,
    };
  }

  create({
    name,
    description,
    price,
    recurrence,
    qtd_access,
    user_id,
  }: IPlanCreate): Plans {
    const plan = this.ormRepository.create({
      name,
      description,
      price,
      recurrence,
      qtd_access,
      user_id,
    });

    return plan;
  }

  async save(plan: Plans): Promise<Plans> {
    const newPlan = await this.ormRepository.save(plan);

    return newPlan;
  }

  async remove(plan: Plans): Promise<void> {
    await this.ormRepository.remove(plan);
  }
}
export { PlanRepository };

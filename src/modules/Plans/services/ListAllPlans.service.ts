import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import { Plans } from '../entities/Plans';
import { IPlansRepository } from '../repositories/PlanRepositories.interface';
import { IListAllPlansDTO } from './dto/ListAllPlansDTO';

@injectable()
class ListAllPlansService {
  constructor(
    @inject('PlanRepository')
    private planRepository: IPlansRepository,
  ) {}

  public async execute({
    page,
    limit,
  }: IListAllPlansDTO): Promise<IPaginatedResponse<Plans>> {
    const plan = await this.planRepository.listBy({
      page,
      limit,
    });

    return {
      results: plan.results,
      limit: plan.limit,
      page: plan.page,
      total: plan.total,
    };
  }
}

export { ListAllPlansService };

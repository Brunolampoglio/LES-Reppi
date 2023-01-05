import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { Plans } from '../entities/Plans';
import { IPlansRepository } from '../repositories/PlanRepositories.interface';
import { ICreatePlansDTO } from './dto/CreatePlansDTO';

@injectable()
class CreatePlanService {
  constructor(
    @inject('PlanRepository')
    private planRepository: IPlansRepository,
  ) {}

  public async execute({
    name,
    description,
    price,
    recurrence,
    qtd_access,
    user_id,
    isMaster,
  }: ICreatePlansDTO): Promise<Plans> {
    if (!isMaster)
      throw new AppError('Você não tem permissão para criar um plano', 403);

    const plan = this.planRepository.create({
      name,
      description,
      price,
      recurrence,
      qtd_access,
      user_id,
    });

    await this.planRepository.save(plan);

    return plan;
  }
}

export { CreatePlanService };

import { AppError } from '@shared/error/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import { Plans } from '../entities/Plans';
import { IPlansRepository } from '../repositories/PlanRepositories.interface';
import { IUpdatePlanDTO } from './dto/UpdatePlansDTO';

@injectable()
class UpdatePlanService {
  constructor(
    @inject('PlanRepository')
    private planRepository: IPlansRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    price,
    recurrence,
    qtd_access,
    isMaster,
  }: IUpdatePlanDTO): Promise<Plans> {
    const plan = await this.planRepository.findBy({ id });

    if (!plan) throw new AppError('Plano não encontrado', 404);

    if (!isMaster)
      throw new AppError(
        'Você não tem permissão para atualizar este plano',
        403,
      );

    Object.assign(plan, {
      name,
      description,
      price,
      recurrence,
      qtd_access,
    });

    const newPlan = await this.planRepository.save(plan);

    return newPlan;
  }
}
export { UpdatePlanService };

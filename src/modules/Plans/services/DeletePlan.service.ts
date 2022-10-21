import { AppError } from '@shared/error/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { injectable, inject } from 'tsyringe';
import { IPlansRepository } from '../repositories/PlanRepositories.interface';
import { IDeletePlanDTO } from './dto/DeletePlanDTO';

@injectable()
class DeletePlanService {
  constructor(
    @inject('PlanRepository')
    private planRepository: IPlansRepository,
  ) {}

  public async execute({ id, isMaster }: IDeletePlanDTO): Promise<void> {
    const plan = await this.planRepository.findBy({ id });

    if (!plan) throw new AppError('Plano não encontrado', 404);

    if (!isMaster)
      throw new AppError('Você não tem permissão para deletar este plano', 403);

    await this.planRepository.remove(plan);
  }
}
export { DeletePlanService };

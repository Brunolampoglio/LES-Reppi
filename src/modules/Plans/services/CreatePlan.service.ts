// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  }: ICreatePlansDTO): Promise<Plans> {
    const plan = this.planRepository.create({
      name,
      description,
      price,
      recurrence,
      qtd_access,
    });

    await this.planRepository.save(plan);

    return plan;
  }
}

export { CreatePlanService };

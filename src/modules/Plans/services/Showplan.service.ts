import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { Plans } from "../entities/Plans";
import { IPlansRepository } from "../repositories/PlanRepositories.interface";
import { IShowPlanDTO } from "./dto/ShowPlanDTO";

@injectable()
class ShowPlanService {
  constructor(
    @inject("PlanRepository")
    private planRepository: IPlansRepository,
  ){}

  public async execute({ id }: IShowPlanDTO): Promise<Plans> {
    const plan = await this.planRepository.Show(id);

    if (!plan) throw new AppError("Plano não encontrado", 404);

    return plan;
  }
}
export { ShowPlanService };

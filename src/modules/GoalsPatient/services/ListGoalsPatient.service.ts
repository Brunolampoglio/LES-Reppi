import { AppError } from "@shared/error/AppError";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { inject, injectable } from "tsyringe";
import { GoalsPatient } from "../entities/GoalsPatient";
import { IGoalsPatientRepository } from "../repositories/GoalsRepositories.interface";
import { IListGoalsPatientDTO } from "./dto/ListGoalsPatientDTO";

@injectable()
class ListGoalsPatientService {
  constructor(
    @inject("GoalsPatientRepository")
    private goalsPatientRepository: IGoalsPatientRepository,
  ) {}

  public async execute({ patient_id, page, limit }: IListGoalsPatientDTO): Promise<IPaginatedResponse<GoalsPatient>> {
    const goalsPatient = await this.goalsPatientRepository.listBy({ filters: { patient_id }, page, limit });

    if (!goalsPatient) throw new AppError("Goals não encontrado", 404);

    return {
      results: goalsPatient.results,
      limit: goalsPatient.limit,
      page: goalsPatient.page,
      total: goalsPatient.total,
    };
  }
}

export { ListGoalsPatientService };

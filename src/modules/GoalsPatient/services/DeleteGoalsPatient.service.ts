import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { IGoalsPatientRepository } from "../repositories/GoalsRepositories.interface";
import { IDeleteGoalsPatientDTO } from "./dto/DeleteGoalsPatientDTO";

@injectable()
class DeleteGoalsPatientService {
  constructor(
    @inject("GoalsPatientRepository")
    private goalsPatientRepository: IGoalsPatientRepository,
  ) {}

  public async execute({ goals_id }: IDeleteGoalsPatientDTO): Promise<void> {
    const goalsPatient = await this.goalsPatientRepository.findBy({
      id: goals_id,
    });

    if (!goalsPatient) throw new AppError("Goals não encontrado", 404);

    await this.goalsPatientRepository.remove(goalsPatient);
  }
}

export { DeleteGoalsPatientService };

import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { GoalsPatient } from "../entities/GoalsPatient";
import { IGoalsPatientRepository } from "../repositories/GoalsRepositories.interface";
import { IUpdateGoalsPatientDTO } from "./dto/UpdateGoalsPatientDTO";

@injectable()
class UpdateGoalsPatientService {
  constructor(
    @inject("GoalsPatientRepository")
    private goalsPatientRepository: IGoalsPatientRepository,
  ) {}

  public async execute({
    typeofgoal,
    description,
    from,
    goals_id,
    points,
    to
   }: IUpdateGoalsPatientDTO): Promise<GoalsPatient> {

    const goalsPatient = await this.goalsPatientRepository.findBy({
      id: goals_id,
    });

    if (!goalsPatient) throw new AppError("Goals não encontrado", 404);

    Object.assign(goalsPatient, {
      typeofgoal,
      description,
      from,
      goals_id,
      points,
      to
    });

    const newGoalsPatient = await this.goalsPatientRepository.save(goalsPatient);

    return newGoalsPatient;
 }
}

export { UpdateGoalsPatientService };

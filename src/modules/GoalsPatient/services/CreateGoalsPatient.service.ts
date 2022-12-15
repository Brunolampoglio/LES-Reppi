import { inject, injectable } from "tsyringe";
import { GoalsPatient } from "../entities/GoalsPatient";
import { IGoalsPatientRepository } from "../repositories/GoalsRepositories.interface";
import { ICreateGoalsPatientDTO } from "./dto/CreateGoalsPatientDTO";

@injectable()
class CreateGoalsPatientService {
  constructor(
    @inject("GoalsPatientRepository")
    private goalsPatientRepository: IGoalsPatientRepository,
  ) {}

  public async execute({
    typeofgoal,
    from,
    to,
    description,
    points,
    patient_id,
  }: ICreateGoalsPatientDTO): Promise<GoalsPatient> {
    const goalsPatient = this.goalsPatientRepository.create({
      typeofgoal,
      from,
      to,
      description,
      points,
      patient_id,
    });

    await this.goalsPatientRepository.save(goalsPatient);

    return goalsPatient;
  }
}

export { CreateGoalsPatientService };

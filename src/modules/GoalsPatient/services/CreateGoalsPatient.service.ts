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
    type,
  }: ICreateGoalsPatientDTO): Promise<GoalsPatient> {


    let pesoMeta = 0;
    if(typeofgoal === 'peso'){
      if(type ==='perder'){
        pesoMeta = parseInt(from) - parseInt(to);
      }else {
        pesoMeta = parseInt(from) + parseInt(to);
      }
  }

    const goalsPatient = this.goalsPatientRepository.create({
      typeofgoal,
      from,
      to: pesoMeta.toString(),
      description,
      points,
      patient_id,
      type: type || 'perder',
    });

    await this.goalsPatientRepository.save(goalsPatient);

    return goalsPatient;
  }
}

export { CreateGoalsPatientService };

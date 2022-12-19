import { IMyPointsRepository } from "@modules/myPoints/repositories/MyPointsRepositories.interface";
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

    @inject("MyPointsRepository")
    private myPointsRepository: IMyPointsRepository
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

    const patient = await this.myPointsRepository.findBy({user_id: goalsPatient.patient_id});

    if(!patient) throw new AppError("Paciente não encontrado", 404);

    Object.assign(goalsPatient, {
      typeofgoal,
      description,
      from,
      goals_id,
      points,
      to
    });

    if(goalsPatient.to === goalsPatient.from){
      goalsPatient.status = "Concluído";
      patient.points = goalsPatient.points + patient.points;

    }

    const newGoalsPatient = await this.goalsPatientRepository.save(goalsPatient);
    await this.myPointsRepository.save(patient);

    return newGoalsPatient;
 }
}

export { UpdateGoalsPatientService };

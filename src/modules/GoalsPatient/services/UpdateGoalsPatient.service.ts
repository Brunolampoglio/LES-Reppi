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
    status,
    goals_id,
   }: IUpdateGoalsPatientDTO): Promise<GoalsPatient> {

    const goalsPatient = await this.goalsPatientRepository.findBy({
      id: goals_id,
    });

    if (!goalsPatient) throw new AppError("Metas não encontrado", 404);

    const patient = await this.myPointsRepository.findBy({user_id: goalsPatient.patient_id});

    if(!patient) throw new AppError("Pontos não encontrado", 404);

    if(status = "Concluído"){
      goalsPatient.status = status;
      patient.points = goalsPatient.points + patient.points;
    }

    await this.goalsPatientRepository.save(goalsPatient);
    await this.myPointsRepository.save(patient);

    return goalsPatient;
 }
}

export { UpdateGoalsPatientService };

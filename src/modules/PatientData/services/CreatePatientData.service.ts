import { inject, injectable } from "tsyringe";
import { PatientData } from "../entities/PatientData";
import { IPatientDataCreate } from "../repositories/dto/PatientDataRepositoryDTO";
import { IPatientDataRepository } from "../repositories/PatientDataRepositories.interface";

@injectable()
class CreatePatientDataService {
  constructor(
    @inject("PatientDataRepository")
    private patientDataRepository: IPatientDataRepository,
  ) {}

public async execute({
    colesterol,
    creatinina,
    hemoglobina_glicada,
    peso,
    descricao,
    user_id,
  }: IPatientDataCreate): Promise<PatientData> {
    const patientData = this.patientDataRepository.create({
      colesterol,
      creatinina,
      hemoglobina_glicada,
      peso,
      descricao,
      user_id,
    });

    await this.patientDataRepository.save(patientData);

    return patientData;
  }


}

export { CreatePatientDataService };

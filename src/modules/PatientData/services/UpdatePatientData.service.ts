import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { PatientData } from "../entities/PatientData";
import { IPatientDataRepository } from "../repositories/PatientDataRepositories.interface";
import { IPatientDataUpdate } from "./dto/UpdatePatientDataDTO";

@injectable()
class UpdatePatientDataService {
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
    patientDataId,
  }: IPatientDataUpdate): Promise<PatientData> {
    const patientDataExists = await this.patientDataRepository.findBy({
      id: patientDataId,
    });

    if (!patientDataExists) throw new AppError("Dados do paciente não encontrado", 404);


    Object.assign(patientDataExists, {
      colesterol,
      creatinina,
      hemoglobina_glicada,
      peso,
      descricao,});

      const newPatientData = await this.patientDataRepository.save(patientDataExists);

      return newPatientData;

    }

}

export { UpdatePatientDataService };

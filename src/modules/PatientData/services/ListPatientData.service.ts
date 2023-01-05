import { AppError } from "@shared/error/AppError";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { inject, injectable } from "tsyringe";
import { PatientData } from "../entities/PatientData";
import { IPatientDataRepository } from "../repositories/PatientDataRepositories.interface";
import { IListPatientDataDTO } from "./dto/ListPatientDataDTO";

@injectable()
class ListPatientDataService {
  constructor(
    @inject("PatientDataRepository")
    private patientDataRepository: IPatientDataRepository,
  ) {}

  public async execute({
    patientId,
  }: IListPatientDataDTO): Promise<PatientData> {
    const patientData = await this.patientDataRepository.findBy({user_id: patientId});

    if (!patientData) {
      throw new AppError("Paciente não encontrado");
    }

    return patientData;
  }
}
export { ListPatientDataService };

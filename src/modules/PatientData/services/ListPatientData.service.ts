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
  }: IListPatientDataDTO): Promise<IPaginatedResponse<PatientData>> {
    const patientData = await this.patientDataRepository.listBy({filters: { user_id: patientId }});

    return {
      results: patientData.results,
      total: patientData.total,
      page: patientData.page,
      limit: patientData.limit,
    };
  }
}
export { ListPatientDataService };

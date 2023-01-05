import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { inject, injectable } from "tsyringe";
import { PatientMenu } from "../entities/PatientMenu";
import { IPatientMenuRepository } from "../repositories/PatienteMenuRepositories.interface";
import { IListPatientMenuDTO } from "./dto/ListPatientMenuDTO";

@injectable()
class ListPatientMenuService {
  constructor(
    @inject("PatientMenuRepository")
    private patientMenuRepository: IPatientMenuRepository,
  ) {}

  public async execute({
    patientId,
  }: IListPatientMenuDTO): Promise<IPaginatedResponse<PatientMenu>> {
    const patientMenu = await this.patientMenuRepository.listBy({filters: { user_id: patientId }});

    return {
      results: patientMenu.results,
      total: patientMenu.total,
      page: patientMenu.page,
      limit: patientMenu.limit,
    };
  }
}
export { ListPatientMenuService };

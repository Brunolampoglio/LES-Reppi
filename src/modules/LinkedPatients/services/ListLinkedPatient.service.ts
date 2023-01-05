import { AppError } from "@shared/error/AppError";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { inject, injectable } from "tsyringe";
import { LinkedPatients } from "../entities/LinkedPatients";
import { ILinkedPatientsRepository } from "../repositories/LinkedPatientRepository";
import { IListLinkedPatientsDTO } from "./dto/ListLinkedPatientsDTO";

@injectable()
class ListLinkedPatientService {
  constructor(
    @inject('LinkedPatientsRepository')
    private linkedPatientsRepository: ILinkedPatientsRepository,
  ){}

  public async execute({ gestor_id, page = 1, limit = 10 }: IListLinkedPatientsDTO): Promise<IPaginatedResponse<LinkedPatients>> {
    const linkedPatients = await this.linkedPatientsRepository.listBy({ filters: { gestor_id }, page, limit });

    if(!linkedPatients) throw new AppError('Pacientes Vinculados não encontrado', 404);

    return {
      results: linkedPatients.results,
      limit: linkedPatients.limit,
      page: linkedPatients.page,
      total: linkedPatients.total,
    }
  }
}
export { ListLinkedPatientService };

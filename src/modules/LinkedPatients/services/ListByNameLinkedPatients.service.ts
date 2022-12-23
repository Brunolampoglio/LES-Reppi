import { AppError } from "@shared/error/AppError";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { inject, injectable } from "tsyringe";
import { LinkedPatients } from "../entities/LinkedPatients";
import { ILinkedPatientsRepository } from "../repositories/LinkedPatientRepository";
import { IListByNameLinkedPatientsDTO, IListLinkedPatientsDTO } from "./dto/ListLinkedPatientsDTO";

@injectable()
class ListByNameLinkedPatientService {
  constructor(
    @inject('LinkedPatientsRepository')
    private linkedPatientsRepository: ILinkedPatientsRepository,
  ){}

  public async execute({ name, gestor_id, page = 1, limit = 10 }: IListByNameLinkedPatientsDTO): Promise<LinkedPatients> {
    const linkedPatients = await this.linkedPatientsRepository.listByName(name, gestor_id );

    if(!linkedPatients) throw new AppError('Pacientes Vinculados não encontrado', 404);

    return linkedPatients;
  }
}
export { ListByNameLinkedPatientService };

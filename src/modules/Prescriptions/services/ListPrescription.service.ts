import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { inject, injectable } from "tsyringe";
import { Prescriptions } from "../entities/Prescriptions";
import { IPrescriptionsRepository } from "../repositories/Prescriptions.interface";
import { IlistPrescriptionDTO } from "./dto/ListPrescriptionDTO";

@injectable()
class ListPrescriptionService {
  constructor(
    @inject("PrescriptionRepository")
    private prescriptionRepository: IPrescriptionsRepository,
  ){}

  public async execute({patient_id, page, limit}: IlistPrescriptionDTO): Promise<IPaginatedResponse<Prescriptions>>{
    const prescriptions = await this.prescriptionRepository.listBy({ filters: { patient_id }, page, limit });

    return prescriptions;
  }
}

export { ListPrescriptionService };


import { injectable, inject } from "tsyringe";
import { Prescriptions } from "../entities/Prescriptions";
import { IPrescriptionsRepository } from "../repositories/Prescriptions.interface";
import { IPrescriptionCreate } from "./dto/CreatePrescriptionDTO";

@injectable()
class CreatePrescriptionService {
  constructor(
    @inject('PrescriptionsRepository')
    private prescriptionsRepository: IPrescriptionsRepository,
  ) {}

  public async execute({
    anexo,
    patient_id,
  }: IPrescriptionCreate): Promise<Prescriptions> {

    const prescription = this.prescriptionsRepository.create({
      anexo,
      patient_id,
    });

    await this.prescriptionsRepository.save(prescription);

    return prescription;
  }
}
export { CreatePrescriptionService };

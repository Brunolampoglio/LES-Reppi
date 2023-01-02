import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { Prescriptions } from "../entities/Prescriptions";
import { IPrescriptionsRepository } from "../repositories/Prescriptions.interface";
import { IPrescriptionUpdate } from "./dto/UpdatePrescriptionDTO";

@injectable()
class UpdatePrescriptionService {
  constructor(
    @inject('PrescriptionsRepository')
    private prescriptionsRepository: IPrescriptionsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    anexo,
    prescription_id
  }: IPrescriptionUpdate): Promise<Prescriptions> {

    const prescription = await this.prescriptionsRepository.findBy({ id: prescription_id,
  });

    if (!prescription) throw new AppError('Receita médica não encontrada', 404);

    const filename = await this.storageProvider.saveFile(anexo);

    if(prescription.anexo) {
      await this.storageProvider.deleteFile(prescription.anexo);
    }

    prescription.anexo = filename;

    await this.prescriptionsRepository.save(prescription);

    return prescription;
  }

}

export { UpdatePrescriptionService };

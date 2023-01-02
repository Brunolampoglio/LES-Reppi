import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { IPrescriptionsRepository } from "../repositories/Prescriptions.interface";
import { IPrescriptionDelete } from "./dto/DeletePrescriptionDTO";

@injectable()
class DeletePrescriptionService {
  constructor(
    @inject('PrescriptionsRepository')
    private prescriptionsRepository: IPrescriptionsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ prescription_id }: IPrescriptionDelete): Promise<void> {
    const prescription = await this.prescriptionsRepository.findBy({ id: prescription_id });

    if (!prescription) throw new AppError('Receita médica não encontrada', 404);

    if(prescription.anexo) {
      await this.storageProvider.deleteFile(prescription.anexo);
    }

    prescription.anexo = null;

    await this.prescriptionsRepository.remove(prescription);

  }

}

export { DeletePrescriptionService };

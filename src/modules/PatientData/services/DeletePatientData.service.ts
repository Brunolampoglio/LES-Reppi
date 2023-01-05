import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { IPatientDataRepository } from "../repositories/PatientDataRepositories.interface";
import { IDeletePatientDataDTO } from "./dto/DeletePatientDataDTO";

@injectable()
class DeletePatientDataService {
  constructor(
    @inject("PatientDataRepository")
    private patientDataRepository: IPatientDataRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ){}

  public async execute({
    patientDataId,
  }: IDeletePatientDataDTO): Promise<void> {
    const patientData = await this.patientDataRepository.findBy({ id: patientDataId });

    if (!patientData) throw new AppError("Paciente não encontrado", 404);

    if(patientData.eletrocardiograma) {
    await this.storageProvider.deleteFile(patientData.eletrocardiograma);
    }

    await this.patientDataRepository.remove(patientData)
 }
}
export { DeletePatientDataService };

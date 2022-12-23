import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { inject, injectable } from "tsyringe";
import { PatientData } from "../entities/PatientData";
import { IPatientDataCreate } from "../repositories/dto/PatientDataRepositoryDTO";
import { IPatientDataRepository } from "../repositories/PatientDataRepositories.interface";

@injectable()
class CreatePatientDataService {
  constructor(
    @inject("PatientDataRepository")
    private patientDataRepository: IPatientDataRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

public async execute({
    colesterol,
    creatinina,
    hemoglobina_glicada,
    peso,
    descricao,
    user_id,
    eletrocardiograma,
  }: IPatientDataCreate): Promise<PatientData> {


    const patientData = this.patientDataRepository.create({
      colesterol,
      creatinina,
      hemoglobina_glicada,
      peso,
      descricao,
      user_id,
    });


    if (eletrocardiograma) {
      const filename = await this.storageProvider.saveFile(eletrocardiograma);
      patientData.eletrocardiograma = filename;
    }

    await this.patientDataRepository.save(patientData);

    return patientData;
  }


}

export { CreatePatientDataService };

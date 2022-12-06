import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { IPatientDataRepository } from "../repositories/PatientDataRepositories.interface";
import { IDeletePatientDataDTO } from "./dto/DeletePatientDataDTO";

@injectable()
class DeletePatientDataService {
  constructor(
    @inject("PatientDataRepository")
    private patientDataRepository: IPatientDataRepository,
  ){}

  public async execute({
    patientId,
  }: IDeletePatientDataDTO): Promise<void> {
    const patientData = await this.patientDataRepository.findBy({ user_id: patientId });

    if (!patientData) throw new AppError("Paciente não encontrado", 404);

    await this.patientDataRepository.remove(patientData);
 }
}
export { DeletePatientDataService };

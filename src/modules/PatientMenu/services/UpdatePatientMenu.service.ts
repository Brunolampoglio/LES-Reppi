import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { PatientMenu } from "../entities/PatientMenu";
import { IPatientMenuRepository } from "../repositories/PatienteMenuRepositories.interface";
import { IUpdatePatientMenuDTO } from "./dto/UpdatePatientMenuDTO";

@injectable()
class UpdatePatientMenuService {
  constructor(
    @inject("PatientMenuRepository")
    private patientMenuRepository: IPatientMenuRepository,
  ) {}

  public async execute({
    patientMenuId,
    dayofweek,
    description,
    hour,
  }:IUpdatePatientMenuDTO): Promise<PatientMenu> {
    const patientMenuExists = await this.patientMenuRepository.findBy({
      id: patientMenuId,
    });

    if (!patientMenuExists) throw new AppError("Menu do paciente não encontrado", 404);

    Object.assign(patientMenuExists, {
      dayofweek,
      description,
      hour,
    });

    await this.patientMenuRepository.save(patientMenuExists);

    return patientMenuExists;

  }

}
export { UpdatePatientMenuService };

import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { IPatientMenuRepository } from "../repositories/PatienteMenuRepositories.interface";
import { IDeletePatientMenuDTO } from "./dto/DeletePatientMenuDTO";

@injectable()
class DeletePatientMenuService {
    constructor(
        @inject('PatientMenuRepository')
        private patientMenuRepository: IPatientMenuRepository,
    ) {}

    public async execute({
        patientMenuId,
    }: IDeletePatientMenuDTO): Promise<void> {

        const patientMenu = await this.patientMenuRepository.findBy({ id: patientMenuId });

        if (!patientMenu) throw new AppError("Paciente não encontrado", 404);

        await this.patientMenuRepository.remove(patientMenu);
    }

}

export { DeletePatientMenuService };

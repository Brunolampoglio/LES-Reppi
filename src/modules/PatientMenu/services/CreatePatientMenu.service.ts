import { inject, injectable } from "tsyringe";
import { PatientMenu } from "../entities/PatientMenu";
import { IPatientMenuRepository } from "../repositories/PatienteMenuRepositories.interface";
import { IPatientMenuCreate } from "./dto/CreatePatientMenuDTO";

@injectable()
class CreatePatientMenuService {
    constructor(
        @inject('PatientMenuRepository')
        private patientMenuRepository: IPatientMenuRepository,
    ) {}

    public async execute({
            dayofweek,
            description,
            patientId,
            hour,
            typeofmeal,
        }: IPatientMenuCreate): Promise<PatientMenu> {

        const patientMenu = this.patientMenuRepository.create({
            dayofweek,
            description,
            user_id:patientId,
            hour,
            typeofmeal,
               });

        await this.patientMenuRepository.save(patientMenu);

        return patientMenu;

    }
}

export { CreatePatientMenuService };

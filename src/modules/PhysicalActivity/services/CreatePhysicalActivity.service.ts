import { IUserRepository } from "@modules/User/repositories/UserRepository.interface";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { PhysicalActivity } from "../entities/PhysicalActivity";
import { IPhysicalActivityRepository } from "../repositories/PhysicalActivityRepositories.interface";
import { ICreatePhysicalActivityDTO } from "./dto/CreatePhysicalActivityDTO";

@injectable()
class CreatePhysicalActivityService {
    constructor(
        @inject('PhysicalActivityRepository')
        private physicalActivityRepository: IPhysicalActivityRepository,

        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute({
        description,
        repetitions,
        series,
        type,
        patient_id,
    }: ICreatePhysicalActivityDTO): Promise<PhysicalActivity> {

        const user = await this.userRepository.findBy({ id: patient_id });

        if (!user) {
            throw new AppError('Usuário não encontrado', 404);
        }

        const physicalActivity = this.physicalActivityRepository.create({
            description,
            repetitions,
            series,
            type,
            client_id: patient_id,
        });

        await this.physicalActivityRepository.save(physicalActivity);

        return physicalActivity;

    }

 }


export { CreatePhysicalActivityService };

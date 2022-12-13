import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { IPhysicalActivityRepository } from "../repositories/PhysicalActivityRepositories.interface";
import { IDeletePhysicalActivityDTO } from "./dto/DeletePhysicalActivityDTO";

@injectable()
class DeletePhysicalActivityService {
    constructor(
        @inject('PhysicalActivityRepository')
        private physicalActivityRepository: IPhysicalActivityRepository,
    ) {}

    public async execute({
        physicalActivityId,
    }: IDeletePhysicalActivityDTO): Promise<void> {

        const physicalActivity = await this.physicalActivityRepository.findBy({ id: physicalActivityId });

        if (!physicalActivity) throw new AppError("Atividade física não encontrada", 404);

        await this.physicalActivityRepository.delete(physicalActivity);
    }

}

export { DeletePhysicalActivityService };

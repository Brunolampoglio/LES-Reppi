import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { PhysicalActivity } from "../entities/PhysicalActivity";
import { IPhysicalActivityRepository } from "../repositories/PhysicalActivityRepositories.interface";
import { IUpdatePhysicalActivityDTO } from "./dto/UpdatePhysicalActivityDTO";

@injectable()
class UpdatePhysicalActivityService {
  constructor(
    @inject('PhysicalActivityRepository')
        private physicalActivityRepository: IPhysicalActivityRepository,
  ){}

  public async execute({
    physicalActivityId,
    description,
    repetitions,
    series,
    type,
  }: IUpdatePhysicalActivityDTO): Promise<PhysicalActivity> {
    const physicalActivity = await this.physicalActivityRepository.findBy({ id: physicalActivityId });

    if (!physicalActivity) throw new AppError("Atividade física não encontrada", 404);

    Object.assign(physicalActivity, {
      description,
      repetitions,
      series,
      type,
    });

    await this.physicalActivityRepository.save(physicalActivity);

    return physicalActivity;

  }

}

export { UpdatePhysicalActivityService };

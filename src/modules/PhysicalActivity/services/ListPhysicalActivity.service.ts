import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { inject, injectable } from "tsyringe";
import { PhysicalActivity } from "../entities/PhysicalActivity";
import { IPhysicalActivityRepository } from "../repositories/PhysicalActivityRepositories.interface";
import { IListPhysicalActivityDTO } from "./dto/ListPhysicalActivityDTO";

@injectable()
class ListPhysicalActivityService {
  constructor(
    @inject("PhysicalActivityRepository")
    private physicalActivityRepository: IPhysicalActivityRepository,
  ) {}

  public async execute({
    patient_id
  }: IListPhysicalActivityDTO): Promise<IPaginatedResponse<PhysicalActivity>> {
    const physicalActivity = await this.physicalActivityRepository.listBy({
      filters: { client_id: patient_id },
    });

    return {
      results: physicalActivity.results,
      total: physicalActivity.total,
      page: physicalActivity.page,
      limit: physicalActivity.limit,
    };
  }
}

export { ListPhysicalActivityService };

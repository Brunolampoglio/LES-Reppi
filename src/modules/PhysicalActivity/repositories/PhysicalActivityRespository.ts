import { IPaginatedRequest } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { Repository, getRepository } from "typeorm";
import { PhysicalActivity } from "../entities/PhysicalActivity";
import { IPhysicalActivityCreate } from "./dto/PhysicalActivityDTO";
import { IPhysicalActivityRepository } from "./PhysicalActivityRepositories.interface";

class PhysicalActivityRepository implements IPhysicalActivityRepository {
  private ormRepository: Repository<PhysicalActivity>;

  constructor() {
    this.ormRepository = getRepository(PhysicalActivity);
  }


  async findBy(filter: Partial<PhysicalActivity>): Promise<PhysicalActivity | undefined> {
    const physicalActivity = await this.ormRepository.findOne(filter);

    return physicalActivity;

  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<PhysicalActivity>): Promise<IPaginatedResponse<PhysicalActivity>> {
    const physicalActivities = await this.ormRepository.find({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    const physicalActivityTotal = await this.ormRepository.count(filters);

    return {
      results: physicalActivities,
      total: physicalActivityTotal,
      page,
      limit,
    };
  }

  public async show(id: string): Promise<IPaginatedResponse<PhysicalActivity>> {

        const physicalActivities = await this.ormRepository.find(
          {
            where: {id},
          },
        );

        const physicalActivityTotal = await this.ormRepository.count();

        return {
          results: physicalActivities,
          total: physicalActivityTotal,
          page: 1,
          limit: 10,
        };
      }

  create({
    description,
    client_id,
    series,
    repetitions,
    type,
  }: IPhysicalActivityCreate): PhysicalActivity {
    const physicalActivity = this.ormRepository.create({
      description,
      client_id,
      series,
      repetitions,
      type,
    });

    return physicalActivity;
  }

  async save(physicalActivity: PhysicalActivity): Promise<PhysicalActivity> {
    const newPhysicalActivity = await this.ormRepository.save(physicalActivity);

    return newPhysicalActivity;

  }

  async delete(physicalActivity: PhysicalActivity): Promise<void> {
    await this.ormRepository.remove(physicalActivity);
  }
}

export {PhysicalActivityRepository};

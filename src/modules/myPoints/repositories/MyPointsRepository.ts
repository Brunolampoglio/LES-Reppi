import { IPaginatedRequest } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { Repository, getRepository } from "typeorm";
import { MyPoints } from "../entities/MyPoints";
import { IMyPointsCreate } from "./dto/MyPointsRepositoryDTO";
import { IMyPointsRepository } from "./MyPointsRepositories.interface";

class MyPointsRepository implements IMyPointsRepository {
  private ormRepository: Repository<MyPoints>;

  constructor() {
    this.ormRepository = getRepository(MyPoints);
  }

  async findBy(filter: Partial<MyPoints>): Promise<MyPoints | undefined> {
    const myPoints = await this.ormRepository.findOne(filter);

    return myPoints;

  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<MyPoints>): Promise<IPaginatedResponse<MyPoints>> {
    const myPoints = await this.ormRepository.find({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    const myPointsTotal = await this.ormRepository.count(filters);

    return {
      results: myPoints,
      total: myPointsTotal,
      page,
      limit,
    };
  }

  create({ user_id, points }: IMyPointsCreate): MyPoints {
    const myPoints = this.ormRepository.create({
      user_id,
      points,
    });

    return myPoints;
  }

  async save(myPoints: MyPoints): Promise<MyPoints> {
    const newMyPoints = await this.ormRepository.save(myPoints);

    return newMyPoints;
  }

  async remove(myPoints: MyPoints): Promise<void> {
    await this.ormRepository.remove(myPoints);
  }

}

export { MyPointsRepository };

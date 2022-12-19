import { IPaginatedRequest } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { Repository, getRepository } from "typeorm";
import { Awards } from "../entities/Awards";
import { IAwardsRepository } from "./AwardsRepositories.interface";
import { IAwardsCreate } from "./dto/AwardsRepositoryDTO";

class AwardsRepository implements IAwardsRepository {
  private ormRepository: Repository<Awards>;

  constructor() {
    this.ormRepository = getRepository(Awards);
  }

  public async findBy(filter: Partial<Awards>): Promise<Awards | undefined> {
    const awards = await this.ormRepository.findOne(filter);

    return awards;

  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<Awards>): Promise<IPaginatedResponse<Awards>> {
    const awards = await this.ormRepository.find({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    const awardsTotal = await this.ormRepository.count(filters);

    return {
      results: awards,
      total: awardsTotal,
      page,
      limit,
    };
  }

  public async show(id: string): Promise<IPaginatedResponse<Awards>> {
    const awards = await this.ormRepository.find({
      where: { id },
    });

    const awardsTotal = await this.ormRepository.count();

    return {
      results: awards,
      total: awardsTotal,
      page: 1,
      limit: 10,
    };
  }

  create({
    description,
    points,
    client_id,
  }: IAwardsCreate): Awards {
    const awards = this.ormRepository.create({
      description,
      points,
      client_id,
    });

    return awards;
  }

  public async save(awards: Awards): Promise<Awards> {
    const newAwards = await this.ormRepository.save(awards);

    return newAwards;
  }

  public async remove(awards: Awards): Promise<void> {
    await this.ormRepository.remove(awards);
  }

}

export default AwardsRepository;

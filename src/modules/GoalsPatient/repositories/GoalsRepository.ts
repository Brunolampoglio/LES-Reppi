import { IPaginatedRequest, IPaginatedRequestObri } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { Repository, getRepository } from "typeorm";
import { GoalsPatient } from "../entities/GoalsPatient";
import { IGoalsCreate } from "./dto/GoalsRepositoryDTO";
import { IGoalsPatientRepository } from "./GoalsRepositories.interface";

class GoalsPatientRepository implements IGoalsPatientRepository {
  private ormRepository: Repository<GoalsPatient>;

  constructor() {
    this.ormRepository = getRepository(GoalsPatient);
  }

  public async findBy(filter: Partial<GoalsPatient>): Promise<GoalsPatient | undefined> {
    const goals = await this.ormRepository.findOne(filter);

    return goals;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<GoalsPatient>): Promise<IPaginatedResponse<GoalsPatient>> {
    const goals = await this.ormRepository.find({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    const goalsTotal = await this.ormRepository.count(filters);

    return {
      results: goals,
      total: goalsTotal,
      page,
      limit,
    };
  }

  public async show(id: string): Promise<IPaginatedResponse<GoalsPatient>> {
    const goals = await this.ormRepository.find({
      where: { id },
    });

    const goalsTotal = await this.ormRepository.count();

    return {
      results: goals,
      total: goalsTotal,
      page: 1,
      limit: 10,
    };
  }

  create({
    typeofgoal,
    from,
    to,
    description,
    points,
    patient_id,
  }: IGoalsCreate): GoalsPatient {
    const goals = this.ormRepository.create({
      typeofgoal,
      from,
      to,
      description,
      points,
      patient_id,
      status: "pendente",
    });

    return goals;
  }

  async save(goals: GoalsPatient): Promise<GoalsPatient> {
    const newGoals = await this.ormRepository.save(goals);

    return newGoals;
  }

  async remove(goals: GoalsPatient): Promise<void> {
    await this.ormRepository.remove(goals);
  }
}

export { GoalsPatientRepository };

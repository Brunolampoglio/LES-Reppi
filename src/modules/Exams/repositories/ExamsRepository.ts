import { IPaginatedRequest } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { Repository, getRepository } from "typeorm";
import { Exam } from "../entities/Exams";
import { IExamsCreate } from "./dto/ExamsRepositoryDTO";
import { IExamsRepository } from "./ExamsRepositories.interface";

class ExamRepository implements IExamsRepository {
  private ormRepository: Repository<Exam>;

  constructor() {
    this.ormRepository = getRepository(Exam);
  }

  async findBy(filter: Partial<Exam>): Promise<Exam | undefined> {
    const exam = await this.ormRepository.findOne(filter);

    return exam;

  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<Exam>): Promise<IPaginatedResponse<Exam>> {
    const exams = await this.ormRepository.find({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    const examTotal = await this.ormRepository.count(filters);

    return {
      results: exams,
      total: examTotal,
      page,
      limit,
    };
  }

  public async show(id: string): Promise<IPaginatedResponse<Exam>> {

      const exams = await this.ormRepository.find(
        {
          where: {id},
        },
      );

      const examTotal = await this.ormRepository.count();

      return {
        results: exams,
        total: examTotal,
        page: 1,
        limit: 10,
      };
    }

  create({
    name,
    hour,
    day,
    month,
    client_id,
  }: IExamsCreate): Exam {
    const exam = this.ormRepository.create({
      name,
      hour,
      day,
      month,
      client_id,
    });

    return exam;
  }

  async save(exam: Exam): Promise<Exam> {
    const newExam = await this.ormRepository.save(exam);

    return newExam;

  }

  async remove(exam: Exam): Promise<void> {
    await this.ormRepository.remove(exam);
  }
}

export { ExamRepository };

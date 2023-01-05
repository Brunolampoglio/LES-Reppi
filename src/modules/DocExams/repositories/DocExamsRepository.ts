import { IPaginatedRequestObri } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { Repository, getRepository } from "typeorm";
import { DocExams } from "../entities/DocExams";
import { IDocExamsRepository } from "./DocExamsRepositories.interface";
import { IDocExamsCreate } from "./dto/DocExamsRepositoryDTO";

class DocExamsRepository implements IDocExamsRepository {
  private ormRepository: Repository<DocExams>;

  constructor() {
    this.ormRepository = getRepository(DocExams);
  }

  async findBy(filter: Partial<DocExams>): Promise<DocExams | undefined> {
    const docExams = await this.ormRepository.findOne(filter);

    return docExams;

  }

  public async listBy({
    page,
    limit ,
    filters,
  }: IPaginatedRequestObri<DocExams>): Promise<IPaginatedResponse<DocExams>> {
    const docExams = await this.ormRepository.find({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    const docExamsTotal = await this.ormRepository.count(filters);

    return {
      results: docExams,
      total: docExamsTotal,
      page,
      limit,
    };
  }

  public async show(id: string): Promise<IPaginatedResponse<DocExams>> {

    const docExams = await this.ormRepository.find(
      {
        where: {id},
      },
    );

    const docExamsTotal = await this.ormRepository.count();

    return {
      results: docExams,
      total: docExamsTotal,
      page: 1,
      limit: 10,
    };
  }

  create({
    date,
    anexo,
    name,
    specialty,
    user_id,
  }: IDocExamsCreate): DocExams {
    const docExams = this.ormRepository.create({
      date,
      anexo,
      name,
      specialty,
      user_id,
    });

    return docExams;

  }

  public async save(docExams: DocExams): Promise<DocExams> {
    const newDocExams = await this.ormRepository.save(docExams);

    return newDocExams;
 }

  public async remove(docExams: DocExams): Promise<void> {
  await this.ormRepository.remove(docExams);
 }

}

export { DocExamsRepository };

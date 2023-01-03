import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { inject, injectable } from "tsyringe";
import { Exam } from "../entities/Exams";
import { IExamsRepository } from "../repositories/ExamsRepositories.interface";
import { IListExamsDTO } from "./dto/ListExamDTO";

@injectable()
class ListExamsService {
  constructor(
    @inject("ExamRepository")
    private examRepository: IExamsRepository,
  ) {}

  public async execute({
    client_id,
    patient_id,
  }: IListExamsDTO): Promise<IPaginatedResponse<Exam>> {
    const exams = await this.examRepository.listBy({filters: {client_id, patient_id}});

    return {
      results: exams.results,
      total: exams.total,
      page: exams.page,
      limit: exams.limit,
    };

 }
}
export { ListExamsService };

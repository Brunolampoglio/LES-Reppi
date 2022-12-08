import { IPaginatedRequest } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { Exam } from "../entities/Exams";
import { IExamsCreate } from "./dto/ExamsRepositoryDTO";

interface IExamsRepository {
  findBy(filter: Partial<Exam>): Promise<Exam | undefined>;
  listBy(
    filter: IPaginatedRequest<Exam>,
  ): Promise<IPaginatedResponse<Exam>>;
  show(id: string): Promise<IPaginatedResponse<Exam>>;
  create(exams: IExamsCreate): Exam;
  save(exams: Exam): Promise<Exam>;
  remove(exams: Exam): Promise<void>;
}
export { IExamsRepository };

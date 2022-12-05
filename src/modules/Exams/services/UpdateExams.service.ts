import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { Exam } from "../entities/Exams";
import { IExamsRepository } from "../repositories/ExamsRepositories.interface";
import { IUpdateExamsDTO } from "./dto/UpdateExamsDTO";

@injectable()
class UpdateExamsService {
  constructor(
    @inject("ExamRepository")
    private examRepository: IExamsRepository,
  ) {}

  public async execute({
    examId,
    name,
    hour,
    day,
    month,
    isMaster,
  }: IUpdateExamsDTO): Promise<Exam> {
    const examExists = await this.examRepository.findBy({
      id: examId,
    });

    if (!examExists) throw new AppError("Exame não encontrado", 404);

    if(!isMaster) throw new AppError("Você não tem permissão para editar este exame", 401);

    Object.assign(examExists, {
      name,
      hour,
      day,
      month,
    });

    const newExam = await this.examRepository.save(examExists);

    return newExam;

  }

}

export { UpdateExamsService };


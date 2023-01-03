import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { IExamsRepository } from "../repositories/ExamsRepositories.interface";
import { IDeleteExamsDTO } from "./dto/DeleteExamsDTO";

@injectable()
class DeleteExamsService {
  constructor(
    @inject("ExamRepository")
    private examRepository: IExamsRepository,
  ) {}

  public async execute({
    examId,
  }: IDeleteExamsDTO): Promise<void> {

    const exam = await this.examRepository.findBy({ id: examId });

    if (!exam) throw new AppError("Exame não encontrado", 404);

    await this.examRepository.remove(exam);
  }
}

export { DeleteExamsService };

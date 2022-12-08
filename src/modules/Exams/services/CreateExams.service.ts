import { inject, injectable } from "tsyringe";
import { Exam } from "../entities/Exams";
import { IExamsRepository } from "../repositories/ExamsRepositories.interface";
import { ICreateExamsDTO } from "./dto/CreateExamsDTO";

@injectable()
class CreateExamsService {
  constructor(
    @inject("ExamRepository")
    private examRepository: IExamsRepository,
  ) {}

  public async execute({
    name,
    hour,
    day,
    month,
    client_id,
  }: ICreateExamsDTO): Promise<Exam> {
    const exams = this.examRepository.create({
      name,
      hour,
      day,
      month,
      client_id,
    });

    await this.examRepository.save(exams);

    return exams;

  }

}

export { CreateExamsService };


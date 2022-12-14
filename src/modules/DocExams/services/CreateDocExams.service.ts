import { inject, injectable } from "tsyringe";
import { DocExams } from "../entities/DocExams";
import { IDocExamsRepository } from "../repositories/DocExamsRepositories.interface";
import { ICreateDocExamsDTO } from "./dto/CreateDocExamsDTO";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

@injectable()
class CreateDocExamsService {
    constructor(
        @inject("DocExamsRepository")
        private docExamsRepository: IDocExamsRepository,
    ) {}

    public async execute({
        user_id,
        name,
        specialty,
        anexo,
    }: ICreateDocExamsDTO): Promise<DocExams> {
        const date_now = dayjs.utc().format('DD/MM/YYYY');
        const docExam = this.docExamsRepository.create({
            anexo,
            date: date_now,
            name,
            specialty,
            user_id,
        });

        await this.docExamsRepository.save(docExam);

        return docExam;
    }
}

export { CreateDocExamsService };

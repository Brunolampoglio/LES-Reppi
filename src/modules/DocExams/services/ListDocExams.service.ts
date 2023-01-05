import { AppError } from "@shared/error/AppError";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { instanceToInstance } from "class-transformer";
import { inject, injectable } from "tsyringe";
import { DocExams } from "../entities/DocExams";
import { IDocExamsRepository } from "../repositories/DocExamsRepositories.interface";

@injectable()
class ListDocExamsService {
    constructor(
        @inject("DocExamsRepository")
        private docExamsRepository: IDocExamsRepository,
    ) {}

    public async execute({
        user_id,
        page,
        limit,
    }: IListDocExamsDTO): Promise<IPaginatedResponse<DocExams>> {
        const docExams = await this.docExamsRepository.listBy({
            filters: { user_id },
            page,
            limit,
        });

        if (!docExams) throw new AppError("Documentos não encontrados", 404);

        return {
            results: instanceToInstance(docExams.results),
            limit: docExams.limit,
            page: docExams.page,
            total: docExams.total,
        };
    }
}

export { ListDocExamsService };

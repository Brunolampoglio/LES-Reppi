import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { IDocExamsRepository } from "../repositories/DocExamsRepositories.interface";
import { IDeleteDocExamsDTO } from "./dto/DeleteDocExamsDTO";

@injectable()
class DeleteDocExamsService {
    constructor(
        @inject("DocExamsRepository")
        private docExamsRepository: IDocExamsRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({
        docexam_id,
    }: IDeleteDocExamsDTO): Promise<void> {
        const docExams = await this.docExamsRepository.findBy({
            id: docexam_id
        });

        if (!docExams) throw new AppError("Documento não encontrado", 404);

        if(docExams.anexo) await this.storageProvider.deleteFile(docExams.anexo);

        await this.docExamsRepository.remove(docExams);
    }
}

export { DeleteDocExamsService };

import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/error/AppError";
import { injectable, inject } from "tsyringe";
import { DocExams } from "../entities/DocExams";
import { IDocExamsRepository } from "../repositories/DocExamsRepositories.interface";
import { IUpdateDocExamsDTO } from "./dto/UpdateDocExamsDTO";

@injectable()
class UpdateDocExamsService {
    constructor(
        @inject("DocExamsRepository")
        private docExamsRepository: IDocExamsRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({
        anexo,
        docexam_id,
        name,
        specialty,
    }: IUpdateDocExamsDTO): Promise<DocExams> {

        const docExams = await this.docExamsRepository.findBy({
            id: docexam_id,
        });

        if (!docExams) throw new AppError('Documento não encontrado', 404);

        let anexoFilename = '';

        if(anexo) {
            anexoFilename = await this.storageProvider.saveFile(anexo);
        }

        if (docExams.anexo) {
            await this.storageProvider.deleteFile(docExams.anexo);
        }

        Object.assign(docExams, {
            anexo: anexoFilename,
            name,
            specialty,
        });

        const newDocExams = await this.docExamsRepository.save(docExams);

        return newDocExams;
    }
}

export { UpdateDocExamsService };

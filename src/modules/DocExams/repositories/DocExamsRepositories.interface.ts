import { IPaginatedRequestObri } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { DocExams } from "../entities/DocExams";
import { IDocExamsCreate } from "./dto/DocExamsRepositoryDTO";

interface IDocExamsRepository {
    findBy(filter: Partial<DocExams>): Promise<DocExams | undefined>;
    listBy(filter: IPaginatedRequestObri<DocExams>): Promise<IPaginatedResponse<DocExams>>;
    show(id: string): Promise<IPaginatedResponse<DocExams>>;
    create(docExams: IDocExamsCreate): DocExams;
    save(docExams: DocExams): Promise<DocExams>;
    remove(docExams: DocExams): Promise<void>;
}
export { IDocExamsRepository };

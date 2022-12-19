import { IPaginatedRequest } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { Awards } from "../entities/Awards";
import { IAwardsCreate } from "./dto/AwardsRepositoryDTO";

interface IAwardsRepository {
  findBy(filter: Partial<Awards>): Promise<Awards | undefined>;
  listBy(
    filter: IPaginatedRequest<Awards>,
  ): Promise<IPaginatedResponse<Awards>>;
  show(id: string): Promise<IPaginatedResponse<Awards>>;
  create(awards: IAwardsCreate): Awards;
  save(awards: Awards): Promise<Awards>;
  remove(awards: Awards): Promise<void>;
}

export { IAwardsRepository };

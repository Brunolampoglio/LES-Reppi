import { IPaginatedRequest } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { MyPoints } from "../entities/MyPoints";
import { IMyPointsCreate } from "./dto/MyPointsRepositoryDTO";

interface IMyPointsRepository {
  findBy(filter: Partial<MyPoints>): Promise<MyPoints | undefined>;
  listBy(
    filter: IPaginatedRequest<MyPoints>,
  ): Promise<IPaginatedResponse<MyPoints>>;
  create(myPoints: IMyPointsCreate): MyPoints;
  save(myPoints: MyPoints): Promise<MyPoints>;
  remove(myPoints: MyPoints): Promise<void>;
}

export { IMyPointsRepository };

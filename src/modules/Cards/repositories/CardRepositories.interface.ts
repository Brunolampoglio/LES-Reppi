import { IPaginatedRequest } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { Card } from "../entities/Card";
import { ICardCreate } from "./dto/CardRepositoryDTO";

interface ICardRepository {
  findBy(filter: Partial<Card>): Promise<Card | undefined>;
  listBy(
    filter: IPaginatedRequest<Card>,
  ): Promise<IPaginatedResponse<Card>>;
  show(id: string): Promise<IPaginatedResponse<Card>>;
  create(card: ICardCreate): Card;
  save(card: Card): Promise<Card>;
  remove(card: Card): Promise<void>;
}
export { ICardRepository };

import { Card } from '../entities/Card';
import { ICardCreate } from './dto/CardRepositoryDTO';

interface ICardRepository {
  listBy(user_id: string): Promise<Card[]>;
  show(id: string): Promise<Card | undefined>;
  create(card: ICardCreate): Card;
  save(card: Card | Card[]): Promise<Card>;
  remove(card: Card): Promise<void>;
  findByIds(ids: string[]): Promise<Card[]>;
}
export { ICardRepository };

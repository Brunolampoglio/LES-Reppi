import { Repository, getRepository } from 'typeorm';
import { Card } from '../entities/Card';
import { ICardRepository } from './CardRepositories.interface';
import { ICardCreate } from './dto/CardRepositoryDTO';

class CardRepository implements ICardRepository {
  private ormRepository: Repository<Card>;

  constructor() {
    this.ormRepository = getRepository(Card);
  }

  async listBy(user_id: string): Promise<Card[]> {
    const card = await this.ormRepository.find({
      where: { user_id },
    });

    return card;
  }

  async show(id: string): Promise<Card | undefined> {
    const card = await this.ormRepository.findOne(id);

    return card;
  }

  async findByIds(ids: string[]): Promise<Card[]> {
    const cards = await this.ormRepository.findByIds(ids);

    return cards;
  }

  create({
    first_digits,
    last_digits,
    brand,
    holder_name,
    expiration_month,
    expiration_year,
    main,
    user_id,
  }: ICardCreate): Card {
    const card = this.ormRepository.create({
      first_digits,
      last_digits,
      brand,
      holder_name,
      expiration_month,
      expiration_year,
      main,
      user_id,
    });

    return card;
  }

  async save(card: Card): Promise<Card> {
    const cardSaved = await this.ormRepository.save(card);

    return cardSaved;
  }

  async remove(card: Card): Promise<void> {
    await this.ormRepository.remove(card);
  }
}

export { CardRepository };

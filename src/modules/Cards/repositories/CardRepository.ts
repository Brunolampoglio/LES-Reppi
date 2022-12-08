import { IPaginatedRequest } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { Repository, getRepository } from "typeorm";
import { Card } from "../entities/Card";
import { ICardRepository } from "./CardRepositories.interface";
import { ICardCreate } from "./dto/CardRepositoryDTO";

class CardRepository implements ICardRepository {
  private ormRepository: Repository<Card>;

  constructor() {
    this.ormRepository = getRepository(Card);
  }

  async findBy(filter: Partial<Card>): Promise<Card | undefined> {
    const card = await this.ormRepository.findOne(filter);

    return card;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<Card>): Promise<IPaginatedResponse<Card>> {
    const cards = await this.ormRepository.find({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    const cardTotal = await this.ormRepository.count(filters);

    return {
      results: cards,
      total: cardTotal,
      page,
      limit,
    };
  }

  public async show(id: string): Promise<IPaginatedResponse<Card>> {

    const cards = await this.ormRepository.find(
      {
        where: {id},
      },
    );

    const cardTotal = await this.ormRepository.count();

    return {
      results: cards,
      total: cardTotal,
      page: 1,
      limit: 10,
    };
  }

  create({
    external_id,
    first_digits,
    last_digits,
    brand,
    holder_name,
    expiration_month,
    expiration_year,
    main,
    user_id,
  }: ICardCreate): Card {  const card = this.ormRepository.create({
      external_id,
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






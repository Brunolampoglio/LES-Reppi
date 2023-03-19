import { inject, injectable } from 'tsyringe';
import { Card } from '../entities/Card';
import { ICardRepository } from '../repositories/CardRepositories.interface';
import { IListAllCardDTO } from './dto/ListAllCardDTO';

@injectable()
class ListAllCardService {
  constructor(
    @inject('CardRepository')
    private cardRepository: ICardRepository,
  ) {}

  public async execute({ user_id }: IListAllCardDTO): Promise<Card[]> {
    const cards = await this.cardRepository.listBy(user_id);

    return cards;
  }
}
export { ListAllCardService };

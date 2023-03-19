import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { Card } from '../entities/Card';
import { ICardRepository } from '../repositories/CardRepositories.interface';
import { IUpdateCardDTO } from './dto/UpdateCardDTO';

@injectable()
class UpdateCardService {
  constructor(
    @inject('CardRepository')
    private cardRepository: ICardRepository,
  ) {}

  public async execute({ id, user_id, main }: IUpdateCardDTO): Promise<Card> {
    const cards = await this.cardRepository.listBy(user_id);

    if (!cards) throw new AppError('Cartão não encontrado', 404);

    cards.forEach(async card => {
      if (card.id === id) {
        card.main = main;
      } else {
        card.main = false;
      }
    });

    const newCard = await this.cardRepository.save(cards);

    return newCard;
  }
}

export { UpdateCardService };

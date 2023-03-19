import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { ICardRepository } from '../repositories/CardRepositories.interface';
import { IDeleteCardDTO } from './dto/DeleteCardDTO';

@injectable()
class DeleteCardService {
  constructor(
    @inject('CardRepository')
    private cardRepository: ICardRepository,
  ) {}

  public async execute({ card_id, user_id }: IDeleteCardDTO): Promise<void> {
    const card = await this.cardRepository.show(card_id);

    if (!card) throw new AppError('Cartão não encontrado', 404);

    if (card.user_id !== user_id)
      throw new AppError('Usuário não autorizado', 401);

    await this.cardRepository.remove(card);
  }
}

export { DeleteCardService };

import { IUserRepository } from '@modules/User/repositories/UserRepository.interface';
import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { Card } from '../entities/Card';
import { ICardRepository } from '../repositories/CardRepositories.interface';
import { ICreateCardDTO } from './dto/CreateCardDTO';

@injectable()
class CreateCardService {
  constructor(
    @inject('CardRepository')
    private cardRepository: ICardRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    first_digits,
    last_digits,
    brand,
    holder_name,
    expiration_month,
    expiration_year,
    main,
    user_id,
  }: ICreateCardDTO): Promise<Card> {
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new AppError('Usuário não encontrado', 404);

    const card = this.cardRepository.create({
      first_digits,
      last_digits,
      brand,
      holder_name,
      expiration_month,
      expiration_year,
      main,
      user_id,
    });

    await this.cardRepository.save(card);

    return card;
  }
}

export { CreateCardService };

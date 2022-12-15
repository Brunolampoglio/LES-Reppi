import { IUserRepository } from "@modules/User/repositories/UserRepository.interface";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { Card } from "../entities/Card";
import { ICardRepository } from "../repositories/CardRepositories.interface";
import { ICreateCardDTO } from "./dto/CreateCardDTO";

@injectable()
class CreateCardService {
  constructor(
    @inject("CardRepository")
    private cardRepository: ICardRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    holder_name,
    digits,
    expiration,
    main,
    user_id,
  }: ICreateCardDTO): Promise<Card> {

    const user = await this.userRepository.findBy({id: user_id});

    if(!user) throw new AppError('Usuário não encontrado', 404);

    const first_digits = digits.slice(0, 4);
    const last_digits = digits.slice(-4);

    const expiration_month = expiration.slice(0, 2);
    const expiration_year = expiration.slice(-4);

    const month = Number(expiration_month);
    const year = Number(expiration_year);

    const card = this.cardRepository.create({
      external_id: user.id,
      first_digits,
      last_digits,
      brand: 'Visa',
      holder_name,
      expiration_month: month,
      expiration_year: year,
      main,
      user_id,
    });

    await this.cardRepository.save(card);

    return card;
  }
}

export { CreateCardService };

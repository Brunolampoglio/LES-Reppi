import { IUserRepository } from "@modules/User/repositories/UserRepository.interface";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { Card } from "../entities/Card";
import { ICardRepository } from "../repositories/CardRepositories.interface";
import { IUpdateCardDTO } from "./dto/UpdateCardDTO";

@injectable()
class UpdateCardService {
  constructor(
    @inject("CardRepository")
    private cardRepository: ICardRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    id,
    user_id,
    digits,
    expiration,
    main,
    ...cardParams
  }: IUpdateCardDTO): Promise<Card> {
    const { results: card } = await this.cardRepository.listBy({ filters:{ user_id } });

    if (!card) throw new AppError("Cartão não encontrado", 404);

    const first_digits = digits.slice(0, 4);
    const last_digits = digits.slice(-4);

    const expiration_month = expiration.toString().slice(0, 2);
    const expiration_year = expiration.toString().slice(-4);

    const month = Number(expiration_month);
    const year = Number(expiration_year);

    Object.assign(card, {
      first_digits,
      last_digits,
      expiration_month: month,
      expiration_year: year,
      ...cardParams });

      card.forEach(async (card) => {
        if (card.id === id) {
          card.main = main;
        } else {
          card.main = false;
        }
      });

    const newCard = await this.cardRepository.save(card);

    return newCard;
  }
}

export { UpdateCardService };

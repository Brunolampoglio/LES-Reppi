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
    ...cardParams
  }: IUpdateCardDTO): Promise<Card> {
    const card = await this.cardRepository.findBy({ id });

    if (!card) throw new AppError("Cartão não encontrado", 404);

    const user = await this.userRepository.findBy({ id: user_id });

    if (!user) throw new AppError("Usuário não encontrado", 404);

    if(user.id !== card.user_id) throw new AppError('Usuário não autorizado', 404);

    Object.assign(card, { ...cardParams });

    const newCard = await this.cardRepository.save(card);

    return newCard;
  }
}

export { UpdateCardService };

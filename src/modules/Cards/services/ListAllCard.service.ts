import { AppError } from "@shared/error/AppError";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { inject, injectable } from "tsyringe";
import { Card } from "../entities/Card";
import { ICardRepository } from "../repositories/CardRepositories.interface";
import { IListAllCardDTO } from "./dto/ListAllCardDTO";

@injectable()
class ListAllCardService {
  constructor(
    @inject("CardRepository")
    private cardRepository: ICardRepository
  ) {}

  public async execute({
    user_id,
  }: IListAllCardDTO): Promise<IPaginatedResponse<Card>> {
    const cards = await this.cardRepository.listBy({ filters: { user_id } });

    if (!cards) throw new AppError("Cartões não encontrados", 404);

    return {
      results: cards.results,
      limit: cards.limit,
      page: cards.page,
      total: cards.total,
    };
  }
}
export { ListAllCardService };

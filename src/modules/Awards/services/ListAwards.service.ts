import { AppError } from "@shared/error/AppError";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { inject, injectable } from "tsyringe";
import { Awards } from "../entities/Awards";
import { IAwardsRepository } from "../repositories/AwardsRepositories.interface";
import { IListAwardsDTO } from "./dto/ListAwardsDTO";

@injectable()
class ListAwardsService {
  constructor(
    @inject("AwardsRepository")
    private awardsRepository: IAwardsRepository,
  ){}

  public async execute({client_id, page, limit}: IListAwardsDTO): Promise<IPaginatedResponse<Awards>>{
    const awards = await this.awardsRepository.listBy({filters: {client_id}, page, limit});

    if(!awards) throw new AppError('Prêmio não encontrado', 404);

    return {
      results: awards.results,
      limit: awards.limit,
      page: awards.page,
      total: awards.total,
    }
  }
}

export { ListAwardsService };

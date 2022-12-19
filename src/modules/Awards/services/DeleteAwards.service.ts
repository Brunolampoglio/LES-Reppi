import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { IAwardsRepository } from "../repositories/AwardsRepositories.interface";
import { IDeleteAwardsDTO } from "./dto/DeleteAwardstDTO";

@injectable()
class DeleteAwardsService{
  constructor(
    @inject("AwardsRepository")
    private awardsRepository: IAwardsRepository,
  ){}

  public async execute({
  client_id,
  id,
 }: IDeleteAwardsDTO): Promise<void>{
    const awards = await this.awardsRepository.findBy({id});

    if(!awards) throw new AppError('Prêmio não encontrado', 404);


if(awards.client_id !== client_id) throw new AppError('Prêmio não encontrado', 404);

    await this.awardsRepository.remove(awards);
  }
}

export { DeleteAwardsService };

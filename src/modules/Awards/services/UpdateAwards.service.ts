import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { Awards } from "../entities/Awards";
import { IAwardsRepository } from "../repositories/AwardsRepositories.interface";
import { IUpdateAwardsDTO } from "./dto/UpdateAwardsDTO";

@injectable()
class UpdateAwardsService {
  constructor(
    @inject("AwardsRepository")
    private awardsRepository: IAwardsRepository,
  ) {}

  public async execute({
    id,
    client_id,
    description,
    points,
  }: IUpdateAwardsDTO): Promise<Awards> {
    const awards = await this.awardsRepository.findBy({ id });

    if (!awards) throw new AppError("Prêmio não encontrado", 404);

    if (awards.client_id !== client_id)
      throw new AppError("Prêmio não encontrado", 404);

    Object.assign(awards, {
      id,
      description,
      points,
    });

    const newAwards = await this.awardsRepository.save(awards);

    return newAwards;
  }
}

export { UpdateAwardsService };

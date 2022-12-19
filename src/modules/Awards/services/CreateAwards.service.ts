import { inject, injectable } from "tsyringe";
import { Awards } from "../entities/Awards";
import { IAwardsRepository } from "../repositories/AwardsRepositories.interface";
import { ICreateAwardsDTO } from "./dto/CreateAwardsDTO";

@injectable()
class CreateAwardsService {
  constructor(
    @inject("AwardsRepository")
    private awardsRepository: IAwardsRepository,
  ) {}

  public async execute({
    description,
    points,
    client_id,
  }: ICreateAwardsDTO): Promise<Awards> {
    const awards = this.awardsRepository.create({
      description,
      points,
      client_id,
    });

    await this.awardsRepository.save(awards);

    return awards;
  }
}

export { CreateAwardsService };

import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { TermsOfUse } from "../entities/TermsOfUse";
import { ITermsOfUseRepository } from "../repositories/TermsOfUse.interface";
import { ICreateTermsOfUseDTO } from "./dto/CreateTermsOfUseDTO";

@injectable()
class CreateTermsOfUseService {
  constructor(
    @inject('TermsOfUseRepository')
    private termsOfUseRepository: ITermsOfUseRepository,
  ) {}

  public async execute({
    description,
  }: ICreateTermsOfUseDTO): Promise<TermsOfUse> {
    const checkTermsOfUse = await this.termsOfUseRepository.find();

    if (checkTermsOfUse) {
      throw new AppError(
        'Já existe um termo de uso cadastrado no sistema!',
        409,
      );
    }

    const termsOfUse = await this.termsOfUseRepository.create(description);

    return termsOfUse;

  }

}
export { CreateTermsOfUseService };

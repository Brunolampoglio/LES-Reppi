import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { TermsOfUse } from "../entities/TermsOfUse";
import { ITermsOfUseRepository } from "../repositories/TermsOfUse.interface";

@injectable()
class ShowTermsOfUseService {
  constructor(
    @inject("TermsOfUseRepository")
    private termsOfUseRepository: ITermsOfUseRepository
  ) {}

  public async execute(): Promise<TermsOfUse> {
    const termsOfUse = await this.termsOfUseRepository.find();

    if (!termsOfUse)
    throw new AppError("Termos de uso não encontrado", 404);

    return termsOfUse;
  }
}

export { ShowTermsOfUseService };

import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { ITermsOfUseRepository } from "../repositories/TermsOfUse.interface";

@injectable()
class DeleteTermsOfUseService {
  constructor(
    @inject("TermsOfUseRepository")
    private termsOfUseRepository: ITermsOfUseRepository
  ) {}

  public async execute({
    isMaster,
  }: IDeleteTermsOfUseDTO): Promise<void> {
    const termsOfUse = await this.termsOfUseRepository.find();

    if (!termsOfUse) throw new AppError("TermsOfUse não encontrado", 404);

    if (!isMaster)
      throw new AppError(
        "Você não tem permissão para deletar este TermsOfUse",
        403
      );

    await this.termsOfUseRepository.remove(termsOfUse);
  }
}

export { DeleteTermsOfUseService };

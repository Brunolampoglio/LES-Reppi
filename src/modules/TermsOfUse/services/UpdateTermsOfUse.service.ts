import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { TermsOfUse } from "../entities/TermsOfUse";
import { ITermsOfUseRepository } from "../repositories/TermsOfUse.interface";
import { IUpdateTermsOfUseDTO } from "./dto/UpdateTermsOfUseDTO";

@injectable()
class UpdateTermsOfUseService {
  constructor(
    @inject("TermsOfUseRepository")
    private termsOfUseRepository: ITermsOfUseRepository
  ){}

  public async execute({
    description,
    isMaster,
  }: IUpdateTermsOfUseDTO): Promise<TermsOfUse> {
    if(isMaster) throw new AppError("Não tem autorização para alterar o termo de uso", 400);

    const termsOfUse = await this.termsOfUseRepository.find();

    if (!termsOfUse) throw new AppError("TermsOfUse não encontrado", 404);

    termsOfUse.description = description;

    await this.termsOfUseRepository.save(termsOfUse);


    return termsOfUse;
  }


}

export { UpdateTermsOfUseService };

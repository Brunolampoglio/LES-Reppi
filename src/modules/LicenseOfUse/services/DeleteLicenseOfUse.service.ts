import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { ILicenseOfUseRepository } from "../repositories/LicenseOfUse.interface";
import { IDeleteLicenseOfUseDTO } from "./dto/DeleteLicenseOfUseDTO";


@injectable()
class DeleteLicenseOfUseService {
  constructor(
    @inject("LicenseOfUseRepository")
    private licenseOfUseRepository: ILicenseOfUseRepository
  ) {}

  public async execute({
    isMaster,
  }: IDeleteLicenseOfUseDTO): Promise<void> {
    const licenseOfUse = await this.licenseOfUseRepository.find();

    if (!licenseOfUse) throw new AppError("licença de uso não encontrado", 404);

    if (!isMaster)
      throw new AppError(
        "Você não tem permissão para deletar esta licença de uso",
        403
      );

    await this.licenseOfUseRepository.remove(licenseOfUse);
  }
}

export { DeleteLicenseOfUseService };

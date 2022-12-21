import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { LicenseOfUse } from "../entities/LicenseOfUse";
import { ILicenseOfUseRepository } from "../repositories/LicenseOfUse.interface";

@injectable()
class ShowLicenseOfUseService {
  constructor(
    @inject('LicenseOfUseRepository')
    private licenseOfUseRepository: ILicenseOfUseRepository,
  ) {}

  public async execute(): Promise<LicenseOfUse> {
    const licenseOfUse = await this.licenseOfUseRepository.find();

    if (!licenseOfUse)
    throw new AppError("Licença de uso não encontrado", 404);

    return licenseOfUse;
  }
}

export { ShowLicenseOfUseService };

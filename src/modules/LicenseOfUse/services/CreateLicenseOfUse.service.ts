import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { LicenseOfUse } from "../entities/LicenseOfUse";
import { ILicenseOfUseRepository } from "../repositories/LicenseOfUse.interface";
import { ICreateLicenseOfUseDTO } from "./dto/CreateLicenseOfUseDTO";


@injectable()
class CreateLicenseOfUseService {
  constructor(
    @inject('LicenseOfUseRepository')
    private licenseOfUseRepository: ILicenseOfUseRepository,
  ) {}

  public async execute({
    description,
  }: ICreateLicenseOfUseDTO): Promise<LicenseOfUse> {
    const checkLicenseOfUse = await this.licenseOfUseRepository.find();

    if (checkLicenseOfUse) {
      throw new AppError(
        'Já existe um termo de uso cadastrado no sistema!',
        409,
      );
    }

    const licenseOfUse = await this.licenseOfUseRepository.create(description);

    await this.licenseOfUseRepository.save(licenseOfUse);

    return licenseOfUse;

  }

}
export { CreateLicenseOfUseService };

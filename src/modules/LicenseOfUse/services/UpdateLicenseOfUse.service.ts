import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { LicenseOfUse } from "../entities/LicenseOfUse";
import { ILicenseOfUseRepository } from "../repositories/LicenseOfUse.interface";
import { IUpdateLicenseOfUseDTO } from "./dto/UpdateLicenseOfUseDTO";

@injectable()
class UpdateLicenseOfUseService {
  constructor(
    @inject("LicenseOfUseRepository")
    private licenseOfUseRepository: ILicenseOfUseRepository
  ){}

  public async execute({
    description,
    isMaster,
  }: IUpdateLicenseOfUseDTO): Promise<LicenseOfUse> {
    if(!isMaster) throw new AppError("Não tem autorização para alterar o termo de uso", 400);

    const licenseOfUse = await this.licenseOfUseRepository.find();

    if (!licenseOfUse) throw new AppError("LicenseOfUse não encontrado", 404);

    licenseOfUse.description = description;

    await this.licenseOfUseRepository.save(licenseOfUse);


    return licenseOfUse;
  }


}

export { UpdateLicenseOfUseService };

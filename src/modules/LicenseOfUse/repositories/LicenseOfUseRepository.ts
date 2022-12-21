import { Repository, getRepository } from "typeorm";
import { LicenseOfUse } from "../entities/LicenseOfUse";
import { ILicenseOfUseRepository } from "./LicenseOfUse.interface";

class LicenseOfUseRepository implements ILicenseOfUseRepository {

  private ormRepository: Repository<LicenseOfUse>;

  constructor() {
    this.ormRepository = getRepository(LicenseOfUse);
  }

  async find(): Promise<LicenseOfUse | undefined> {
    const licenseOfUse = await this.ormRepository.findOne();

    return licenseOfUse;
  }

  async create(description: string): Promise<LicenseOfUse> {
    const licenseOfUse = this.ormRepository.create({
      description,
    });

    return licenseOfUse;
  }

  async save(data: LicenseOfUse): Promise<LicenseOfUse> {
    const newLicenseOfUse = await this.ormRepository.save(data);

    return newLicenseOfUse;
  }

  async remove(data: LicenseOfUse): Promise<void> {
    await this.ormRepository.remove(data);
  }
}
export { LicenseOfUseRepository };

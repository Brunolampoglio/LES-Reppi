import { LicenseOfUse } from "../entities/LicenseOfUse";

interface ILicenseOfUseRepository {
  find(): Promise<LicenseOfUse | undefined>;
  create(description: string): Promise<LicenseOfUse>;
  save(data: LicenseOfUse): Promise<LicenseOfUse>;
  remove(data: LicenseOfUse): Promise<void>;
}

export { ILicenseOfUseRepository };

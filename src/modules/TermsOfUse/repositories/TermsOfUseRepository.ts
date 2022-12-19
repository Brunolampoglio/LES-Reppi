import { Repository, getRepository } from "typeorm";
import { TermsOfUse } from "../entities/TermsOfUse";
import { ITermsOfUseRepository } from "./TermsOfUse.interface";

class TermsOfUseRepository implements ITermsOfUseRepository {

  private ormRepository: Repository<TermsOfUse>;

  constructor() {
    this.ormRepository = getRepository(TermsOfUse);
  }

  async find(): Promise<TermsOfUse | undefined> {
    const termsOfUse = await this.ormRepository.findOne();

    return termsOfUse;
  }

  async create(description: string): Promise<TermsOfUse> {
    const termsOfUse = this.ormRepository.create({
      description,
    });

    return termsOfUse;
  }

  async save(data: TermsOfUse): Promise<TermsOfUse> {
    const newTermsOfUse = await this.ormRepository.save(data);

    return newTermsOfUse;
  }

  async remove(data: TermsOfUse): Promise<void> {
    await this.ormRepository.remove(data);
  }
}
export { TermsOfUseRepository };

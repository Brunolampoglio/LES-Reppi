import { getRepository, Repository } from 'typeorm';
import { Flag } from '../entities/Flag';
import { ICreateFlagRepositoryDTO } from './dto/CreateFlagRepositoryDTO';
import { IFlagRepository } from './FlagRepository.interface';

class FlagRepository implements IFlagRepository {
  private ormRepository: Repository<Flag>;

  constructor() {
    this.ormRepository = getRepository(Flag);
  }

  create({ name }: ICreateFlagRepositoryDTO): Flag {
    const flag = this.ormRepository.create({ name });

    return flag;
  }

  index(): Promise<Flag[]> {
    return this.ormRepository.find();
  }

  async save(flag: Flag): Promise<Flag> {
    const newFlag = await this.ormRepository.save(flag);

    return newFlag;
  }

  public async findById(id: string): Promise<Flag | undefined> {
    const flag = await this.ormRepository.findOne({
      where: { id },
    });

    return flag;
  }

  async delete(flag: Flag): Promise<void> {
    await this.ormRepository.delete(flag.id);
  }
}
export { FlagRepository };

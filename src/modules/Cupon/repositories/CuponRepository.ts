import { Repository, getRepository } from 'typeorm';
import { Cupon } from '../entities/Cupon';
import { ICuponRepository } from './CuponRepository.interface';
import { ICreateCuponDTO } from './dto/CuponRepositoryDTO';

class CuponRepository implements ICuponRepository {
  private ormRepository: Repository<Cupon>;

  constructor() {
    this.ormRepository = getRepository(Cupon);
  }

  async findById(id: string): Promise<Cupon | undefined> {
    const cupon = await this.ormRepository.findOne(id);

    return cupon;
  }

  async index(): Promise<Cupon[]> {
    const cupons = await this.ormRepository.find();

    return cupons;
  }

  async findByName(name: string): Promise<Cupon | undefined> {
    const cupon = await this.ormRepository.findOne({
      where: { name, active: true },
    });

    return cupon;
  }

  create({ name, description, value, active }: ICreateCuponDTO): Cupon {
    const cupon = this.ormRepository.create({
      name,
      description,
      value,
      active,
    });

    return cupon;
  }

  async save(cupon: Cupon): Promise<Cupon> {
    return this.ormRepository.save(cupon);
  }

  async remove(cupon: Cupon): Promise<void> {
    await this.ormRepository.remove(cupon);
  }
}

export { CuponRepository };

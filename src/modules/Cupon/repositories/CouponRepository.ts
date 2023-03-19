import { Repository, getRepository } from 'typeorm';
import { Coupon } from '../entities/Coupon';
import { ICouponRepository } from './CouponRepository.interface';

import { ICreateCuponDTO } from './dto/CouponRepositoryDTO';

class CouponRepository implements ICouponRepository {
  private ormRepository: Repository<Coupon>;

  constructor() {
    this.ormRepository = getRepository(Coupon);
  }

  async findById(id: string): Promise<Coupon | undefined> {
    const cupon = await this.ormRepository.findOne(id);

    return cupon;
  }

  async index(): Promise<Coupon[]> {
    const cupons = await this.ormRepository.find();

    return cupons;
  }

  async findByName(name: string): Promise<Coupon | undefined> {
    const cupon = await this.ormRepository.findOne({
      where: { name, active: true },
    });

    return cupon;
  }

  create({ name, description, value, active }: ICreateCuponDTO): Coupon {
    const cupon = this.ormRepository.create({
      name,
      description,
      value,
      active,
    });

    return cupon;
  }

  async save(coupon: Coupon): Promise<Coupon> {
    return this.ormRepository.save(coupon);
  }

  async remove(coupon: Coupon): Promise<void> {
    await this.ormRepository.remove(coupon);
  }
}

export { CouponRepository };

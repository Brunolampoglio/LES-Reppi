import { Repository, getRepository } from 'typeorm';
import { Coupon } from '../entities/Coupon';
import { ICouponRepository } from './CouponRepository.interface';

import { ICreateCouponDTO } from './dto/CouponRepositoryDTO';

class CouponRepository implements ICouponRepository {
  private ormRepository: Repository<Coupon>;

  constructor() {
    this.ormRepository = getRepository(Coupon);
  }

  async findById(id: string): Promise<Coupon | undefined> {
    const coupon = await this.ormRepository.findOne(id);

    return coupon;
  }

  async index(): Promise<Coupon[]> {
    const coupons = await this.ormRepository.find();

    return coupons;
  }

  async findByName(name: string): Promise<Coupon | undefined> {
    const coupon = await this.ormRepository.findOne({
      where: { name, active: true },
    });

    return coupon;
  }

  findByIds(ids: string[]): Promise<Coupon[]> {
    const coupons = this.ormRepository.findByIds(ids);

    return coupons;
  }

  create({
    name,
    description,
    value,
    active,
    quantity,
  }: ICreateCouponDTO): Coupon {
    const coupon = this.ormRepository.create({
      name,
      description,
      value,
      active,
      quantity,
    });

    return coupon;
  }

  async save(coupon: Coupon): Promise<Coupon> {
    return this.ormRepository.save(coupon);
  }

  async remove(coupon: Coupon): Promise<void> {
    await this.ormRepository.remove(coupon);
  }
}

export { CouponRepository };

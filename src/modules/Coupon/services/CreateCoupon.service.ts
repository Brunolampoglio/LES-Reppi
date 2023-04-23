import { inject, injectable } from 'tsyringe';
import { Coupon } from '../entities/Coupon';
import { ICouponRepository } from '../repositories/CouponRepository.interface';
import { ICreateCouponDTO } from './dto/CreateCouponDTO';

@injectable()
class CreateCouponService {
  constructor(
    @inject('CouponRepository')
    private couponRepository: ICouponRepository,
  ) {}

  public async execute({
    name,
    description,
    value,
    quantity,
  }: ICreateCouponDTO): Promise<Coupon> {
    const coupon = this.couponRepository.create({
      name,
      description,
      value,
      active: true,
      quantity,
    });

    await this.couponRepository.save(coupon);

    return coupon;
  }
}
export { CreateCouponService };

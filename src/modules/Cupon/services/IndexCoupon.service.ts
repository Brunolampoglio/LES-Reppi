import { injectable, inject } from 'tsyringe';
import { Coupon } from '../entities/Coupon';
import { ICouponRepository } from '../repositories/CouponRepository.interface';

@injectable()
class IndexCouponService {
  constructor(
    @inject('CouponRepository')
    private couponRepository: ICouponRepository,
  ) {}

  public async execute(): Promise<Coupon[]> {
    const coupons = await this.couponRepository.index();

    return coupons;
  }
}

export { IndexCouponService };

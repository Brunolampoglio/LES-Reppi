import { AppError } from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import { Coupon } from '../entities/Coupon';
import { ICouponRepository } from '../repositories/CouponRepository.interface';

@injectable()
class FindByIdCouponService {
  constructor(
    @inject('CouponRepository')
    private couponRepository: ICouponRepository,
  ) {}

  public async execute(coupon_id: string): Promise<Coupon> {
    const coupon = await this.couponRepository.findById(coupon_id);

    if (!coupon) {
      throw new AppError('Cupon não encontrado!', 404);
    }

    return coupon;
  }
}

export { FindByIdCouponService };

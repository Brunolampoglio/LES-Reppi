import { AppError } from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import { Coupon } from '../entities/Coupon';
import { ICouponRepository } from '../repositories/CouponRepository.interface';
import { IUpdateStatusCouponDTO } from './dto/UpdateCouponDTO';

@injectable()
class UpdateStatusCouponService {
  constructor(
    @inject('CouponRepository')
    private couponRepository: ICouponRepository,
  ) { }

  public async execute({
    active,
    coupon_id,
  }: IUpdateStatusCouponDTO): Promise<Coupon> {
    const coupon = await this.couponRepository.findById(coupon_id);

    if (!coupon) {
      throw new AppError('Cupom não encontrado!', 404);
    }

    Object.assign(coupon, {
      active,
    });

    await this.couponRepository.save(coupon);

    return coupon;
  }
}
export { UpdateStatusCouponService };

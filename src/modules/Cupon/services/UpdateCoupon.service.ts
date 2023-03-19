import { AppError } from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import { Coupon } from '../entities/Coupon';
import { ICouponRepository } from '../repositories/CouponRepository.interface';
import { IUpdateCouponDTO } from './dto/UpdateCouponDTO';

@injectable()
class UpdateCouponService {
  constructor(
    @inject('CouponRepository')
    private couponRepository: ICouponRepository,
  ) {}

  public async execute({
    active,
    coupon_id,
    description,
    name,
    value,
  }: IUpdateCouponDTO): Promise<Coupon> {
    const coupon = await this.couponRepository.findById(coupon_id);

    if (!coupon) {
      throw new AppError('Cupon não encontrado!', 404);
    }

    Object.assign(coupon, {
      active,
      description,
      name,
      value,
    });

    await this.couponRepository.save(coupon);

    return coupon;
  }
}
export { UpdateCouponService };

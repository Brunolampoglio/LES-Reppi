import { AppError } from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import { ICouponRepository } from '../repositories/CouponRepository.interface';
import { IDeleteCouponDTO } from './dto/DeleteCouponDTO';

@injectable()
class DeleteCouponService {
  constructor(
    @inject('CouponRepository')
    private couponRepository: ICouponRepository,
  ) { }

  public async execute({ coupon_id }: IDeleteCouponDTO): Promise<void> {
    const coupon = await this.couponRepository.findById(coupon_id);

    if (!coupon) {
      throw new AppError('Cupom não encontrado!', 404);
    }

    await this.couponRepository.remove(coupon);
  }
}
export { DeleteCouponService };

import { AppError } from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import { Cart } from '../entities/Cart';
import { ICartRepository } from '../repositories/CartRepository.interface';

@injectable()
class FindByIdCartService {
  constructor(
    @inject('CouponRepository')
    private cartRepository: ICartRepository,
  ) { }

  public async execute(coupon_id: string): Promise<Cart> {
    const cart = await this.cartRepository.findById(coupon_id);

    if (!cart) {
      throw new AppError('Cupom não encontrado!', 404);
    }

    return cart;
  }
}

export { FindByIdCartService };

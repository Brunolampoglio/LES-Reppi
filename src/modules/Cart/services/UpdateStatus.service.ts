import { AppError } from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import { Cart } from '../entities/Cart';
import { ICartRepository } from '../repositories/CartRepository.interface';
import { IUpdateStatusCartDTO } from './dto/UpdateCartDTO';

@injectable()
class UpdateStatusCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,
  ) {}

  public async execute({
    active,
    cart_id,
  }: IUpdateStatusCartDTO): Promise<Cart> {
    const cart = await this.cartRepository.findById(cart_id);

    if (!cart) {
      throw new AppError('Carrinho não encontrado!', 404);
    }

    Object.assign(cart, {
      active,
    });

    await this.cartRepository.save(cart);

    return cart;
  }
}
export { UpdateStatusCartService };

import { AppError } from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import { ICartRepository } from '../repositories/CartRepository.interface';
import { IRemoveItemCartDTO } from './dto/UpdateCartDTO';
import { Cart } from '../entities/Cart';

@injectable()
class RemoveItemCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,
  ) {}

  public async execute({
    cart_id,
    product_id,
  }: IRemoveItemCartDTO): Promise<Cart> {
    const cart = await this.cartRepository.findById(cart_id);

    if (!cart) {
      throw new AppError('Carrinho não encontrado!', 404);
    }

    if (cart.products.length === 1) {
      await this.cartRepository.remove(cart);
      return {} as Cart;
    }
    cart.products = cart.products.filter(
      prod => prod.product_id !== product_id,
    );
    return this.cartRepository.save(cart);
  }
}
export { RemoveItemCartService };

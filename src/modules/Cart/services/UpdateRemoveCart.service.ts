import { AppError } from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import { Cart } from '../entities/Cart';
import { ICartRepository } from '../repositories/CartRepository.interface';
import { IUpdateCartDTO } from './dto/UpdateCartDTO';

@injectable()
class UpdateRemoveCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,
  ) { }

  public async execute({ cart_id, product_id }: IUpdateCartDTO): Promise<Cart> {
    const cart = await this.cartRepository.findById(cart_id);

    if (!cart) {
      throw new AppError('Carrinho não encontrado!', 404);
    }

    const hasProduct = cart.products.find(
      prod => prod.product_id === product_id,
    );

    if (!hasProduct) {
      throw new AppError('Produto não encontrado!', 404);
    }

    cart.products = cart.products.map(prod => {
      if (prod.product_id === product_id) {
        if (prod.quantity === 1) {
          throw new AppError('Quantidade mínima atingida!', 400);
        }
        prod.quantity -= 1;
      }
      return prod;
    });

    cart.total = cart.products.reduce((acc, prod) => {
      acc += prod.value * prod.quantity;
      return acc;
    }, 0);

    await this.cartRepository.save(cart);

    return cart;
  }
}
export { UpdateRemoveCartService };

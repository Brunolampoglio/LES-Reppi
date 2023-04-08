import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '@modules/Product/repositories/ProductRepository.interface';
import { AppError } from '@shared/error/AppError';
import { Cart } from '../entities/Cart';
import { ICartRepository } from '../repositories/CartRepository.interface';
import { ICreateCartDTO } from './dto/CreateCartDTO';
import { CartProducts } from '../entities/CartProduct';

@injectable()
class CreateCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) { }

  public async execute({ product_id, user_id }: ICreateCartDTO): Promise<Cart> {
    const product = await this.productRepository.findById(product_id);

    if (!product) {
      throw new AppError('Produto não encontrado!', 404);
    }
    const cartProductInstance = new CartProducts();
    const cart = this.cartRepository.create({ user_id, total: product.value });
    const cartWithId = await this.cartRepository.save(cart);

    const productFormatted = {
      product_id: product.id,
      title: product.title,
      author: product.author,
      value: product.value,
      quantity: 1,
      image_url: product.image_url,
    };

    if (cart) {
      Object.assign(cartProductInstance, {
        ...productFormatted,
        cart_id: cartWithId.id,
      });
      cart.products = [cartProductInstance];
    }

    await this.cartRepository.save(cart);

    return cart;
  }
}
export { CreateCartService };

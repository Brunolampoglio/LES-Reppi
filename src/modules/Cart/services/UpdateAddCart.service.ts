import { AppError } from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import { IProductRepository } from '@modules/Product/repositories/ProductRepository.interface';
import { Cart } from '../entities/Cart';
import { ICartRepository } from '../repositories/CartRepository.interface';
import { IUpdateCartDTO } from './dto/UpdateCartDTO';
import { CartProducts } from '../entities/CartProduct';

@injectable()
class UpdateAddCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,

    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) { }

  public async execute({ cart_id, product_id }: IUpdateCartDTO): Promise<Cart> {
    const cart = await this.cartRepository.findById(cart_id);

    if (!cart) {
      throw new AppError('Carrinho não encontrado!', 404);
    }

    const cartProductInstance = new CartProducts();

    const hasProduct = cart.products.find(
      prod => prod.product_id === product_id,
    );

    if (hasProduct) {
      cart.products = cart.products.map(prod => {
        if (prod.product_id === product_id) {
          prod.quantity += 1;
        }
        return prod;
      });
    } else {
      const product = await this.productRepository.findById(product_id);

      if (!product) {
        throw new AppError('Produto não encontrado!', 404);
      }

      const productFormatted = {
        product_id: product.id,
        title: product.title,
        author: product.author,
        value: product.value,
        quantity: 1,
        image_url: product.image_url,
      };
      Object.assign(cartProductInstance, {
        ...productFormatted,
        cart_id,
      });
      cart.products = [...cart.products, cartProductInstance];
    }

    cart.total = cart.products.reduce((acc, prod) => {
      acc += prod.value * prod.quantity;
      return acc;
    }, 0);

    await this.cartRepository.save(cart);

    return cart;
  }
}
export { UpdateAddCartService };

import { injectable, inject } from 'tsyringe';
import { AppError } from '@shared/error/AppError';
import { Cart } from '../entities/Cart';
import { ICartRepository } from '../repositories/CartRepository.interface';

@injectable()
class IndexCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,
  ) { }

  public async execute(user_id: string): Promise<Cart> {
    const cart = await this.cartRepository.findByUser(user_id);

    if (!cart) {
      throw new AppError('Nenhum carrinho encontrado!', 404);
    }

    return cart;
  }
}

export { IndexCartService };

import { AppError } from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import { Cart } from '../entities/Cart';
import { ICartRepository } from '../repositories/CartRepository.interface';

@injectable()
class FindByNameCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,
  ) { }

  public async execute(name: string): Promise<Cart> {
    const cart = await this.cartRepository.findByUser(name);

    if (!cart) {
      throw new AppError('Cupom não encontrado!', 404);
    }

    return cart;
  }
}

export { FindByNameCartService };

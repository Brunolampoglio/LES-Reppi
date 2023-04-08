import { AppError } from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import { ICartRepository } from '../repositories/CartRepository.interface';
import { IDeleteCartDTO } from './dto/DeleteCartDTO';

@injectable()
class DeleteCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,
  ) { }

  public async execute({ cart_id }: IDeleteCartDTO): Promise<void> {
    const cart = await this.cartRepository.findById(cart_id);

    if (!cart) {
      throw new AppError('Carrinho não encontrado!', 404);
    }

    await this.cartRepository.remove(cart);
  }
}
export { DeleteCartService };

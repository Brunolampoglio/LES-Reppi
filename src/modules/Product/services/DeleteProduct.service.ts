/* eslint-disable prettier/prettier */
import { AppError } from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import { IProductRepository } from '../repositories/ProductRepository.interface';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) { }

  public async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Livro não encontrado', 404);
    }

    await this.productRepository.delete(product);
  }
}
export { DeleteProductService };

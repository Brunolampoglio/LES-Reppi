/* eslint-disable prettier/prettier */
import { injectable, inject } from 'tsyringe';
import { Product } from '../entities/Product';
import { IProductRepository } from '../repositories/ProductRepository.interface';

@injectable()
class FindProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) { }

  public async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new Error('Livro não encontrado');
    }

    return product;
  }
}

export { FindProductService };

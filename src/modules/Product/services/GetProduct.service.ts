/* eslint-disable prettier/prettier */
import { injectable, inject } from 'tsyringe';
import { Product } from '../entities/Product';
import { IProductRepository } from '../repositories/ProductRepository.interface';

@injectable()
class GetProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) { }

  public async execute(): Promise<Product[]> {
    const product = await this.productRepository.index();

    return product;
  }
}

export { GetProductService };

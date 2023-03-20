/* eslint-disable prettier/prettier */
import { instanceToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { Product } from '../entities/Product';
import { IProductRepository } from '../repositories/ProductRepository.interface';
import { IUpdateProductStatusDTO } from './dto/UpdateProductDTO';

@injectable()
class UpdateProductStatusService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) { }

  public async execute({
    product_id,
    is_available,
  }: IUpdateProductStatusDTO): Promise<Product> {
    const product = await this.productRepository.findById(product_id);

    if (!product) throw new Error('Livro não encontrado');

    Object.assign(product, {
      is_available,
    });

    await this.productRepository.save(product);

    return instanceToInstance(product);
  }
}

export { UpdateProductStatusService };

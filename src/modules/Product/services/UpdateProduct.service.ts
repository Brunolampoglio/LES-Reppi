/* eslint-disable prettier/prettier */
import { instanceToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import { Product } from '../entities/Product';
import { IProductRepository } from '../repositories/ProductRepository.interface';
import { IUpdateProductDTO } from './dto/UpdateProductDTO';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) { }

  public async execute({
    product_id,
    title,
    author,
    category,
    image_url,
    language,
    bar_code,
    year,
    pages_quantity,
    isbn,
    value,
    publishing_company,
    edition,
    dimensions,
    weight_in_grams,
    stock_units,
    synopsis,
  }: IUpdateProductDTO): Promise<Product> {
    const product = await this.productRepository.findById(product_id);

    if (!product) throw new Error('Livro não encontrado');

    Object.assign(product, {
      title,
      author,
      category,
      image_url,
      language,
      bar_code,
      year,
      pages_quantity,
      isbn,
      value,
      publishing_company,
      edition,
      dimensions,
      weight_in_grams,
      stock_units,
      synopsis,
    });

    await this.productRepository.save(product);

    return instanceToInstance(product);
  }
}

export { UpdateProductService };

/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';
import { Product } from '../entities/Product';
import { IProductRepository } from '../repositories/ProductRepository.interface';
import { ICreateProductDTO } from './dto/CreateProductDTO';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) { }

  public async execute({
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
    synopsis,
    stock_units,
    is_available,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.productRepository.create({
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
      synopsis,
      stock_units,
      is_available,
    });

    await this.productRepository.save(product);
    return product;
  }
}
export { CreateProductService };

import { getRepository, Repository } from 'typeorm';
import { Product } from '../entities/Product';
import { ICreateProductRepositoryDTO } from './dto/CreateProductRepositoryDTO';
import { IProductRepository } from './ProductRepository.interface';

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  create({
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
  }: ICreateProductRepositoryDTO): Product {
    const product = this.ormRepository.create({
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

    return product;
  }

  index(): Promise<Product[]> {
    return this.ormRepository.find();
  }

  async save(product: Product): Promise<Product> {
    const newProduct = await this.ormRepository.save(product);

    return newProduct;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { id },
    });

    return product;
  }

  findByIds(ids: string[]): Promise<Product[]> {
    const products = this.ormRepository.findByIds(ids);

    return products;
  }

  async delete(product: Product): Promise<void> {
    await this.ormRepository.delete(product.id);
  }
}
export { ProductRepository };

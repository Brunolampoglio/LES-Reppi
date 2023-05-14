import { Product } from '../entities/Product';
import { ICreateProductRepositoryDTO } from './dto/CreateProductRepositoryDTO';

interface IProductRepository {
  create(product: ICreateProductRepositoryDTO): Product;
  index(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  findByIds(ids: string[]): Promise<Product[]>;
  save(product: Product): Promise<Product>;
  delete(product: Product): Promise<void>;
}
export { IProductRepository };

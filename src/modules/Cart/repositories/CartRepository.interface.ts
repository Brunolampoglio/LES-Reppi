import { Cart } from '../entities/Cart';
import { ICreateCartDTO } from './dto/CartRepositoryDTO';

export interface ICartRepository {
  index(): Promise<Cart[]>;
  findByUser(user_id: string): Promise<Cart | undefined>;
  findById(id: string): Promise<Cart | undefined>;
  create(cart: ICreateCartDTO): Cart;
  save(cart: Cart): Promise<Cart>;
  remove(cart: Cart): Promise<void>;
  delete(cart_id: string): Promise<void>;
}

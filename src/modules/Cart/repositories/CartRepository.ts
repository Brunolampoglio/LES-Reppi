import { Repository, getRepository } from 'typeorm';
import { Cart } from '../entities/Cart';
import { ICartRepository } from './CartRepository.interface';

import { ICreateCartDTO } from './dto/CartRepositoryDTO';

class CartRepository implements ICartRepository {
  private ormRepository: Repository<Cart>;

  constructor() {
    this.ormRepository = getRepository(Cart);
  }

  async findById(id: string): Promise<Cart | undefined> {
    const cart = await this.ormRepository.findOne(id);

    return cart;
  }

  async index(): Promise<Cart[]> {
    const cart = await this.ormRepository.find();

    return cart;
  }

  async findByUser(user_id: string): Promise<Cart | undefined> {
    const cart = await this.ormRepository.findOne({
      where: { user_id },
    });

    return cart;
  }

  create({ user_id, total }: ICreateCartDTO): Cart {
    const cart = this.ormRepository.create({ user_id, total });

    return cart;
  }

  async save(cart: Cart): Promise<Cart> {
    return this.ormRepository.save(cart);
  }

  async remove(cart: Cart): Promise<void> {
    await this.ormRepository.remove(cart);
  }
}

export { CartRepository };

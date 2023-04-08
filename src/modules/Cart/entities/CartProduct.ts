import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Cart } from './Cart';

@Entity('cartProducts')
class CartProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  image_url: string;

  @Column()
  value: number;

  @Column()
  quantity: number;

  @Column()
  cart_id: string;

  @ManyToOne(() => Cart, cart => cart.products, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { CartProducts };

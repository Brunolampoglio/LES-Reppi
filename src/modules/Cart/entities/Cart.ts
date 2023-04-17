import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { CartProducts } from './CartProduct';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @OneToMany(() => CartProducts, cartProduct => cartProduct.cart, {
    cascade: true,
    eager: true,
  })
  products: CartProducts[];

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  cart: CartProducts;
}

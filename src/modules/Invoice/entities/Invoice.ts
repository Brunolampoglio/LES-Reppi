import { Address } from '@modules/Address/entities/Address';
import { Cart } from '@modules/Cart/entities/Cart';
import { User } from '@modules/User/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('invoices')
class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.invoice, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  cart_id: string;

  @ManyToOne(() => Cart, cart => cart.invoice, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column()
  order_number: string;

  @Column()
  discount: number;

  @Column()
  status: string;

  @Column()
  freight: number;

  @Column()
  total: number;

  @Column()
  address_id: string;

  @ManyToOne(() => Address, address => address.invoice, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Invoice };

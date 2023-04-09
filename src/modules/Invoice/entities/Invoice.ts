import { Address } from '@modules/Address/entities/Address';
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

  @Column()
  cart_id: string;

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

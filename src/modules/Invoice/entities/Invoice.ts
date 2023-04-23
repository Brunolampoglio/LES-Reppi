import { Address } from '@modules/Address/entities/Address';
import { InvoiceProduct } from '@modules/Invoice/entities/InvoiceProduct';
import { User } from '@modules/User/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => InvoiceProduct, invoice => invoice.products, {
    cascade: true,
    eager: true,
  })
  products: InvoiceProduct[];

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

  @ManyToOne(() => Address, address => address.invoice)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  invoice: InvoiceProduct;
}

export { Invoice };

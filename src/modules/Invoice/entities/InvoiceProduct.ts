import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Invoice } from './Invoice';

@Entity('invoiceProducts')
class InvoiceProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  product_id: string;

  @Column()
  author: string;

  @Column()
  image_url: string;

  @Column()
  value: number;

  @Column()
  exchange_status: string;

  @Column({ nullable: true })
  exchange_reason: string;

  @Column()
  invoice_id: string;

  @ManyToOne(() => Invoice, invoice => invoice.products, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'invoice_id' })
  products: Invoice;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { InvoiceProduct };

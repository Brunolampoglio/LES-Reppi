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

@Entity('cardProducts')
export class Cards {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  last_digits: string;

  @Column()
  first_digits: string;

  @Column()
  brand: string;

  @Column()
  holder_name: string;

  @Column()
  expiration_month: number;

  @Column()
  expiration_year: number;

  @Column()
  invoice_id: string;

  @ManyToOne(() => Invoice, invoice => invoice.cards, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

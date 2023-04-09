import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Invoice } from '@modules/Invoice/entities/Invoice';
import { User } from '../../User/entities/User';

@Entity('address')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id_address: string;

  @Column()
  zip: string;

  @Column()
  street: string;

  @Column()
  street_type: string;

  @Column()
  neighborhood: string;

  @Column()
  country: string;

  @Column()
  is_default: boolean;

  @Column({ nullable: true })
  uf: string;

  @Column()
  city: string;

  @Column()
  number: string;

  @Column()
  obs: string;

  @Column()
  type_residence: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.address, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Invoice, invoice => invoice.address, {
    cascade: true,
    eager: true,
  })
  invoice: Invoice[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Address };

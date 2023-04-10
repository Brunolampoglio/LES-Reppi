import { Card } from '@modules/Cards/entities/Card';
import { Invoice } from '@modules/Invoice/entities/Invoice';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from '../../Address/entities/Address';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  cpf: string;

  @Column({ nullable: true })
  birth_date: string;

  @Column()
  gender: string;

  @Column()
  phone: string;

  @Column()
  type_phone: string;

  @Column()
  status: string;

  @Column()
  role: string;

  @OneToMany(() => Address, address => address.user, {
    cascade: true,
    eager: true,
  })
  address: Address[];

  @OneToMany(() => Card, card => card.user, {
    cascade: true,
    eager: true,
  })
  cards: Card[];

  @OneToMany(() => Invoice, invoice => invoice.user, {
    cascade: true,
    eager: true,
  })
  invoice: Invoice[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  user: Address;
}

export { User };

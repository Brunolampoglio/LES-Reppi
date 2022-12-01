import { User } from '@modules/User/entities/User';
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

@Entity('address')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id_address: string;

  @Column()
  zip: string;

  @Column()
  street: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  neighborhood: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  district: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  complement: string;

  @OneToOne(() => User, user => user.address, {
    orphanedRowAction: 'delete',
  })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Address };

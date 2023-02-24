import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';


@Entity('addresses')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id_address: string;

  @Column()
  zip: string;

  @Column()
  street: string;

  @Column()
  uf: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  number: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.address, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Address };

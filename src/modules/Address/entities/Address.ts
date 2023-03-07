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
import { User } from '../../User/entities/User';

@Entity('address')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id_address: string;

  @Column()
  zip: string;

  @Column()
  street: string;

  @Column({ nullable: true })
  uf: string;

  @Column()
  city: string;

  @Column()
  number: string;

  @Column()
  obs: string;

  @Column()
  typeResidence: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.address, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Address };

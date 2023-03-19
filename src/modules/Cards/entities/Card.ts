import { User } from '@modules/User/entities/User';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('card')
export class Card {
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

  @Column({ nullable: true })
  main: boolean;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.cards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

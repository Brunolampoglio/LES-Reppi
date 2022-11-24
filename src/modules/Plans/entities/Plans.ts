import { Invoices } from '@modules/invoices/entities/Invoices';
import { User } from '@modules/User/entities/User';
/* eslint-disable @typescript-eslint/no-unused-vars */
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

@Entity('plans')
class Plans {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  recurrence: string;

  @Column()
  qtd_access: number;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.plans, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Invoices, invoice => invoice.plan, {
    cascade: true,
  })
  invoices: Invoices[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export { Plans };

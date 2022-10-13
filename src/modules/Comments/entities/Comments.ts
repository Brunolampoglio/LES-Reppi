import { User } from '@modules/User/entities/User';
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comments')
class Comments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment: string;

  @Column()
  rate: number;

  @Column()
  userReceiver_id: string;

  @ManyToOne(() => User, user => user.receiver_comments, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userReceiver_id' })
  userReceiver: User;

  @Column()
  userSender_id: string;

  @ManyToOne(() => User, user => user.sender_comments, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userSender_id' })
  userSender: User;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
export { Comments };

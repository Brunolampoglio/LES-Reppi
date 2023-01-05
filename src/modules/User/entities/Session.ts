import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('sessions')
class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  access_datetime: Date;

  @Column()
  disconnect_datetime: Date;

  @Column({ type: 'int', array: true })
  hours: number[];

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.sessions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

}

export { Session };

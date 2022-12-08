import { User } from "@modules/User/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('exams')
class Exam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  hour: string;

  @Column()
  day: string;

  @Column()
  month: string;

  @Column()
  client_id: string;

  @ManyToOne(() => User, user => user.banners, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
export { Exam };

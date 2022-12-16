import { User } from "@modules/User/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('goals_patient')
class GoalsPatient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  typeofgoal: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  description: string;

  @Column()
  points: number;

  @Column()
  status: string;

  @Column()
  patient_id: string;

  @ManyToOne(() => User, user => user.goals_patient, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;



}
export { GoalsPatient };

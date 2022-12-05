import { User } from "@modules/User/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('patient_data')
class PatientData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  colesterol: string;

  @Column()
  creatinina: string;

  @Column()
  hemoglobina_glicada: string;

  @Column()
  peso: string;

  @Column()
  descricao: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.patientData, {
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

export { PatientData };

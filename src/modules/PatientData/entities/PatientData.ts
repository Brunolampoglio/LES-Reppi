import { uploadConfig } from "@config/upload";
import { User } from "@modules/User/entities/User";
import { Expose } from "class-transformer";
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

  @Column({ nullable: true, type: 'varchar' })
  eletrocardiograma: string | null;

  @Expose({ name: 'eletrocardiograma' })
  getAvatarUrl(): string | null {
    if (!this.eletrocardiograma) {
      return process.env.DEFAULT_USER_AVATAR_URL ||'';
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.eletrocardiograma}`;
      case 'spaces':
        return `${process.env.FILE_ENDPOINT}/${this.eletrocardiograma}`;
      default:
        return null;
    }
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { PatientData };

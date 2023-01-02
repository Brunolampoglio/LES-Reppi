import { uploadConfig } from "@config/upload";
import { User } from "@modules/User/entities/User";
import { Expose } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity('prescriptions')
class Prescriptions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patient_id: string;

  @ManyToOne(() => User, user => user.prescriptions, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  user: User;

  @Column({ nullable: true, type: 'varchar' })
  anexo: string | null;

  @Expose({ name: 'anexo' })
  getAvatarUrl(): string | null {
    if (!this.anexo) {
      return process.env.DEFAULT_USER_AVATAR_URL ||'';
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.anexo}`;
      case 'spaces':
        return `${process.env.FILE_ENDPOINT}/${this.anexo}`;
      default:
        return null;
    }
  }

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;


}

export { Prescriptions };

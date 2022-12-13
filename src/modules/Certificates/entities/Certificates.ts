import { uploadConfig } from '@config/upload';
import { User } from '@modules/User/entities/User';
import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('certificates')
class Certificate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  data: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.certificates, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true, type: 'varchar' })
  anexo: string | null;

  @Expose({ name: 'anexo' })
  getAvatarUrl(): string | null {
    if (!this.anexo) {
      return (
        process.env.DEFAULT_USER_AVATAR_URL ||
        `${process.env.APP_API_URL}/files/default.png`
      );
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.anexo}`;
      case 'spaces':
        return `${process.env.FILE_ENDPOINT}/${this.anexo}`;
      default:
        return `${process.env.APP_API_URL}/files/default.png`;
    }
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export { Certificate };

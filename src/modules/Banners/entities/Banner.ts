import { uploadConfig } from '@config/upload';
import { User } from '@modules/User/entities/User';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Expose } from 'class-transformer';
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('banners')
class Banner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  link_banner: string;

  @Column()
  link_image: string;

  @Column()
  dt_initial: Date;

  @Column()
  dt_final: Date;

  @Column({ nullable: true, type: 'varchar' })
  image: string | null;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.banners, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Expose({ name: 'image' })
  getimageUrl(): string | null {
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.image}`;
      case 'spaces':
        return `${process.env.FILE_ENDPOINT}/${this.image}`;
      default:
        return `${process.env.APP_API_URL}/files/default.png`;
    }
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Banner };

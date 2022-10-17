/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import { uploadConfig } from '@config/upload';
import { Comments } from '@modules/Comments/entities/Comments';
import { Banner } from '@modules/Banners/entities/Banner';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true, type: 'varchar' })
  avatar: string | null;

  @Column({ default: 'User' })
  role: string;

  @Column({ nullable: true })
  corporate_name: string;

  @Column({ nullable: true })
  cnpj: string;

  @Column({ nullable: true })
  gestor_id: string;

  @Column({ nullable: true })
  device_token: string;

  @OneToMany(() => Comments, comments => comments.userReceiver, {
    cascade: true,
  })
  receiver_comments: Comments[];

  @OneToMany(() => Comments, comments => comments.userSender, {
    cascade: true,
  })
  sender_comments: Comments[];

  @OneToMany(() => Banner, banner => banner.user, {
    cascade: true,
  })
  banners: Banner[];

  @Expose({ name: 'avatar' })
  getAvatarUrl(): string | null {
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 'spaces':
        return `${process.env.FILE_ENDPOINT}/${this.avatar}`;
      default:
        return `${process.env.APP_API_URL}/files/default.png`;
    }
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { User };

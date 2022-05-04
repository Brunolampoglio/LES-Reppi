import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { hashSync } from 'bcrypt';
import { Exclude, Expose } from 'class-transformer';
import { uploadConfig } from '@config/upload';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return process.env.DEFAULT_USER_AVATAR_URL || '';
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.${process.env.FILE_ENDPOINT}/${this.avatar}`;
      default:
        return null;
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  private hashPassword(): void {
    if (this.password) this.password = hashSync(this.password, 8);
  }
}

export { User };

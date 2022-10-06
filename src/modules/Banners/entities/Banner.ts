import { uploadConfig } from '@config/upload';
import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({ nullable: true, type: 'varchar' })
  image: string | null;

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

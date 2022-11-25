
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import { uploadConfig } from '@config/upload';
import { Comments } from '@modules/Comments/entities/Comments';
import { Banner } from '@modules/Banners/entities/Banner';
import { Plans } from '@modules/Plans/entities/Plans';
import { Invoices } from '@modules/invoices/entities/Invoices';
import { Address } from './Address';
import { Session } from './Session';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  cpf: string;

  @Column({ nullable: true })
  phone_number: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true, type: 'varchar' })
  avatar: string | null;

  @Column({ default: 'User' })
  role: string;

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: true })
  corporate_name: string;

  @Column({ nullable: true })
  cnpj: string;

  @Column({ nullable: true })
  gestor_id: string;

  @Column({ nullable: true })
  device_token: string;

  @Column({ default: true, nullable: true })
  status: boolean;

  @Column({ nullable: true })
  health_insurance: string;

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

  @OneToMany(() => Plans, plans => plans.user, {
    cascade: true,
  })
  plans: Plans[];

  @OneToMany(() => Invoices, invoices => invoices.user, {
    cascade: true,
    eager: true,
  })
  invoices: Invoices[];

  @Column({ nullable: true })
  address_id: string;

  @OneToOne(() => Address, address => address.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Expose({ name: 'avatar' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return (
        process.env.DEFAULT_USER_AVATAR_URL ||
        `${process.env.APP_API_URL}/files/default.png`
      );
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 'spaces':
        return `${process.env.FILE_ENDPOINT}/${this.avatar}`;
      default:
        return `${process.env.APP_API_URL}/files/default.png`;
    }
  }

  @OneToMany(() => Session, session => session.user, {
    cascade: true,
  })
  sessions: Session[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { User };

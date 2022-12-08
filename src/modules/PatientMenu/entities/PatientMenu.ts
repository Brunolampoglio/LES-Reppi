import { User } from "@modules/User/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('patientMenu')
export class PatientMenu {
  @PrimaryGeneratedColumn( 'uuid' )
id: string;

@Column()
dayofweek: string;

@Column()
hour: string;

@Column()
description: string;


@Column()
user_id: string;

@ManyToOne(() => User, user => user.patientMenu, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  orphanedRowAction: 'delete',
})
@JoinColumn({ name: 'user_id' })
user: User;

@CreateDateColumn()
created_at: Date;

@UpdateDateColumn()
updated_at: Date;
}

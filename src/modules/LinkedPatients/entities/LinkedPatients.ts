import { User } from "@modules/User/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('linked_patients')
class LinkedPatients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patient_id: string;

  @ManyToOne(() => User, user => user.linked_patients, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'patient_id' })
  user: User;

  @Column()
  gestor_id: string;

  @ManyToOne(() => User, user => user.linked_patients, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'gestor_id' })
  userGestor: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { LinkedPatients };

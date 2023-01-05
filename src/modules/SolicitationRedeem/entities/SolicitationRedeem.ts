import { Awards } from "@modules/Awards/entities/Awards";
import { User } from "@modules/User/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('solicitation')
class SolicitationRedeem{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({default: 'pendente'})
  status: string;


  @Column()
  awards_id: string;

  @ManyToOne(() => Awards, awards => awards.solicitation, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'awards_id' })
  awards: Awards;


  @Column()
  patient_id: string;

  @ManyToOne(() => User, user => user.solicitation, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
export { SolicitationRedeem };

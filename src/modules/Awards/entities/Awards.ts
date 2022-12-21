import { SolicitationRedeem } from "@modules/SolicitationRedeem/entities/SolicitationRedeem";
import { User } from "@modules/User/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('awards')
class Awards {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  points: number;

  @OneToMany(() => SolicitationRedeem, solicitationRedeem => solicitationRedeem.awards, {
    cascade: true,
  })
  solicitation: SolicitationRedeem[];

  @Column()
  client_id: string;

  @ManyToOne(() => User, user => user.awards, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export { Awards };

import { User } from "@modules/User/entities/User";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('physical_activity')
class PhysicalActivity{
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 description: string;

 @Column()
 series: string;

  @Column()
  repetitions: string;

  @Column()
  type: string;

  @Column()
  client_id: string;

  @ManyToOne(() => User, user => user.physical_activity, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  user: User;


}
export { PhysicalActivity };

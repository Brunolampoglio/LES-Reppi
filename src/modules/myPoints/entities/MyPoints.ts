import { User } from "@modules/User/entities/User";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('mypoints')
class MyPoints {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column({default: 0})
points: number;

@Column()
user_id: string;

@ManyToOne(() => User, user => user.mypoints, {
orphanedRowAction: 'delete',
onDelete: 'CASCADE',
onUpdate: 'CASCADE',
})
@JoinColumn({ name: 'user_id' })
user: User;
}
export { MyPoints };

import { ManyToOne } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";
import { Entity } from "typeorm/decorator/entity/Entity";
import { JoinColumn } from "typeorm/decorator/relations/JoinColumn";
import { JoinTable } from "typeorm/decorator/relations/JoinTable";
import { ManyToMany } from "typeorm/decorator/relations/ManyToMany";
import { OneToMany } from "typeorm/decorator/relations/OneToMany";
import { OneToOne } from "typeorm/decorator/relations/OneToOne";
import Address from "../address/Address";
import Domain from "../Domain";
import Gender from "./Gender";
import Phone from "./Phone";
import User from "./User";

@Entity('tb_persons')
class Person extends Domain {
    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    cellphone: string;

    @Column()
    birth_date: Date;

    @Column()
    gender_id: number;

    @Column()
    user_id: number;

    @JoinTable({ name: 'tb_persons_addresses' })
    @ManyToMany(() => Address, address => address.person, {
        cascade: true, eager: true
    })
    addresses: Address[];

    @JoinColumn({ name: 'gender_id' })
    @ManyToOne(() => Gender, gender => gender.persons, {
        cascade: true, onDelete: 'RESTRICT', onUpdate: 'CASCADE'
    })
    gender: Gender;


    @OneToOne(() => Phone, phone => phone.person, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
        cascade: true, eager: true,
    })
    phone: Phone;

    @JoinColumn({ name: 'user_id' })
    @OneToOne(() => User, user => user.person, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    user: User;

    constructor(
        person?: Partial<Person>
    ) {
        super();
        Object.assign(this, person)
    }
}

export default Person;

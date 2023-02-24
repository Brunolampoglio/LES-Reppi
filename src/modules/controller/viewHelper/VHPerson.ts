import Gender from "@modules/models/users/Gender";
import Person from "@modules/models/users/Person";
import Phone from "@modules/models/users/Phone";
import { Request } from "express";
import moment from 'moment';
import { VHAbstract } from "./VHAbstract";

export class VHPerson extends VHAbstract {
    getEntity(req: Request): Person {
        const {
            ...person
        } = req.body;
        const { id } = req.params;

        const personInstance = new Person();
        if (id) {
            Object.assign(personInstance, { id: Number(id) });
        }

        Object.assign(personInstance, person);

        if (person.birth_date) {
            personInstance.birth_date = moment(person.birth_date, "YYYY-MM-DD").toDate();
        }

        if (person.gender_id) {
            const genderInstance = new Gender({ id: person.gender_id });
            personInstance.gender = genderInstance;
        }

        if (person.phone) {
            const phoneInstance = new Phone(person.phone);
            personInstance.phone = phoneInstance;
        }

        return personInstance;
    }
}

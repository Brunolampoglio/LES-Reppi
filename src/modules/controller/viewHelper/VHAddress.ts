import Address from "@modules/models/address/Address";
import AddressType from "@modules/models/address/AddressType";
import PlaceType from "@modules/models/address/PlaceType";
import { Request } from "express";
import Person from "@modules/models/users/Person";
import { VHAbstract } from "./VHAbstract";


export class VHAddress extends VHAbstract {
    getEntity(req: Request): Address | Person {
        const {
            ...address
        } = req.body;
        const { id } = req.params;

        const addressInstance = new Address();
        if (req.method != 'GET') {
            const person_id = req.params.person_id;

            if (person_id) {
                const personInstance = new Person({ id: Number(person_id) });
                addressInstance.person = [personInstance];
            } else {
                throw new Error('Cadastre os dados pessoais antes de cadastrar um endereço.');
            }
        }

        if (id) {
            Object.assign(addressInstance, { id: Number(id) });
        }

        if (address.place_type_id) {
            addressInstance.place_type = new PlaceType({ id: address.place_type_id })
        }

        if (address.address_type_id) {
            addressInstance.address_type = new AddressType({ id: address.address_type_id })
        }
        Object.assign(addressInstance, address);

        return addressInstance;
    }
}

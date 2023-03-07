import { Address } from "@modules/Address/entities/Address";

export interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    gender: string;
    birth_date: string;
    type_phone: string;
    address: Address;
}
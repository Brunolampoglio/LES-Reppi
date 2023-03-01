export interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    gender: string;
    birth_date: Date;
    type_phone: string;
}
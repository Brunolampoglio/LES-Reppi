export interface ICreateUserRepositoryDTO {
    name: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    status: string;
    role: string;
    gender: string;
    birth_date: Date;
    type_phone: string;
}
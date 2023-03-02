
interface IUpdateUserDTO {
    user_id: string;
    name?: string;
    email?: string;
    cpf?: string;
    phone?: string;
    gender?: string;
    birth_date?: Date;
    type_phone?: string;
}


interface IUpdateUserStatusDTO {
    user_id: string;
    status: string;
}

export { IUpdateUserDTO, IUpdateUserStatusDTO};

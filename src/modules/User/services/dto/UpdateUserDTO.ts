interface IUpdateUserDTO {
  user_id: string;
  request_id: string;
  name?: string;
  cpf?: string;
  cnpj?: string;
  corporate_name?: string;
  phone_number?: string;
  position?: string;
  status?: string;
}

export { IUpdateUserDTO };

import { Roles } from '@shared/enum/Roles';

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: Roles;
  corporate_name?: string;
  cnpj?: string;
  gestor_id?: string;
}

export { ICreateUserDTO };

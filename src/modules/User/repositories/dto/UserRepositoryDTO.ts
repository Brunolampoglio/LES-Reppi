import { Roles } from 'src/shared/enum/Roles';

interface IUserCreate {
  name: string;
  email: string;
  password: string;
  role: Roles;
  corporate_name?: string;
  cnpj?: string;
  cpf?: string;
  gestor_id?: string;
  device_token?: string;
  position?: string;
}

export { IUserCreate };

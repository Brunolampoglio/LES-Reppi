import { Address } from '@modules/User/entities/Address';
import { Positions, Roles } from '@shared/enum/Roles';

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: Roles;
  corporate_name?: string;
  cnpj?: string;
  cpf?: string;
  position?: Positions;
  gestor_id?: string;
  address?: Address;
  phone_number?: string;
}

export { ICreateUserDTO };

import { Card } from '@modules/Cards/entities/Card';
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

export interface ICreateGestorDTO {
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
  plan_id: string;
  card: ICreateCard ;
}

interface ICreateCard {
  digits: string;
  holder_name: string;
  expiration: string;
  main: boolean;
  user_id: string;
}

export { ICreateUserDTO };

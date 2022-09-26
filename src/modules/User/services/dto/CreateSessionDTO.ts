import { User } from '../../entities/User';

interface ICreateSessionDTO {
  device_token?: string;
  email: string;
  password: string;
  remember_me?: boolean;
}

interface ICreateSessionResponseDTO {
  user: User;
  access_token: string;
  refresh_token?: string;
}

export { ICreateSessionDTO, ICreateSessionResponseDTO };

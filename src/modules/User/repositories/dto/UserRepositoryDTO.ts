import { Roles } from 'src/shared/enum/Roles';

interface IUserCreate {
  name: string;
  email: string;
  password: string;
  role: Roles;
  device_token?: string;
}

export { IUserCreate };

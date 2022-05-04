import { Roles } from 'src/shared/enum/Roles';

interface IUserCreate {
  name: string;
  email: string;
  password: string;
  role: Roles;
}

export { IUserCreate };

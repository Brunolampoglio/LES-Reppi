import { IPaginatedRequest, IPaginatedRequestObri } from 'src/shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from 'src/shared/interfaces/IPaginatedResponse';
import { User } from '../entities/User';
import { IUserCreate } from './dto/UserRepositoryDTO';

interface IUserRepository {
  findBy(filter: Partial<User>): Promise<User | undefined>;
  listByUser(filter: IPaginatedRequestObri<User>): Promise<IPaginatedResponse<User>>;
  listCorporate(filter: IPaginatedRequestObri<User>): Promise<IPaginatedResponse<User>>;
  listEmployee(filter: IPaginatedRequest<User> & {gestor_id: string}, ): Promise<IPaginatedResponse<User>>;
  index(): Promise<User[]>;
  create(user: IUserCreate): User;
  save(user: User): Promise<User>;
  remove(user: User): Promise<void>;
}

export { IUserRepository };

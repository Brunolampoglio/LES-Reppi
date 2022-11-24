import { IPaginatedRequest } from 'src/shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from 'src/shared/interfaces/IPaginatedResponse';
import { User } from '../entities/User';
import { IUserCreate } from './dto/UserRepositoryDTO';

interface IUserRepository {
  findBy(filter: Partial<User>): Promise<User | undefined>;
  listByUser(filter: IPaginatedRequest<User>): Promise<IPaginatedResponse<User>>;
  create(user: IUserCreate): User;
  save(user: User): Promise<User>;
  remove(user: User): Promise<void>;
}

export { IUserRepository };

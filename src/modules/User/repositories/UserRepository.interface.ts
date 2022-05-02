import { User } from '../entities/User';
import { IUser } from './dto/UserRepositoryDTO';

interface IUserRepository {
  create(user: IUser): User;
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}

export { IUserRepository };

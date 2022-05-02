import { container } from 'tsyringe';
import { IUserRepository } from 'src/modules/User/repositories/UserRepository.interface';
import { UserRepository } from '../modules/User/repositories/UserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

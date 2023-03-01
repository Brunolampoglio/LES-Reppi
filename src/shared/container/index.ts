
import { container } from 'tsyringe';

import { UserRepository } from '@modules/User/repositories/UserRepository';
import { IUserRepository } from '@modules/User/repositories/UserRepository.interface';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

import { container } from 'tsyringe';

import { UserRepository } from '@modules/User/repositories/UserRepository';
import { IUserRepository } from '@modules/User/repositories/UserRepository.interface';
import { IAddressRepository } from '@modules/Address/repositories/AddressRepository.interface';
import { AddressRepository } from '@modules/Address/repositories/AddressRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IAddressRepository>('AddressRepository', AddressRepository);
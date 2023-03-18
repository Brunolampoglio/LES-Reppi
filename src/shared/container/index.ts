import { container } from 'tsyringe';

import { UserRepository } from '@modules/User/repositories/UserRepository';
import { IUserRepository } from '@modules/User/repositories/UserRepository.interface';
import { IAddressRepository } from '@modules/Address/repositories/AddressRepository.interface';
import { AddressRepository } from '@modules/Address/repositories/AddressRepository';
import { ProductRepository } from '@modules/Product/repositories/ProductRepository';
import { IProductRepository } from '@modules/Product/repositories/ProductRepository.interface';
import { IFlagRepository } from '@modules/Flag/repositories/FlagRepository.interface';
import { FlagRepository } from '@modules/Flag/repositories/FlagRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<IFlagRepository>('FlagRepository', FlagRepository);

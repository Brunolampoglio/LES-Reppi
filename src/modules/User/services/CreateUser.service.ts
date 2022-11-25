import { instanceToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';
import { IHashProvider } from '@shared/container/providers/HashProvider/model/IHashProvider';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { ICreateUserDTO } from './dto/CreateUserDTO';
import { Address } from '../entities/Address';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    role,
    corporate_name,
    cnpj,
    cpf,
    position,
    gestor_id,
    address,
    phone_number,
  }: ICreateUserDTO): Promise<User> {
    const [user_exists, user_existsCnpj, user_existsCpf] = await Promise.all([
      this.userRepository.findBy({
        email,
      }),
      this.userRepository.findBy({ cnpj }),
      this.userRepository.findBy({ cpf }),
    ]);

    if (user_exists || user_existsCnpj || user_existsCpf)
      throw new AppError('Usuário já cadastrado');

    const hashed_password = await this.hashProvider.generateHash(password);
    const addressInstance = new Address();



    const user = this.userRepository.create({
      name,
      email,
      password: hashed_password,
      role,
      corporate_name,
      cnpj,
      cpf,
      position,
      gestor_id: gestor_id || undefined,
     phone_number,
    });

    if(address) {
      Object.assign(addressInstance, { ...address });
      user.address = addressInstance;
    }

    await this.userRepository.save(user);

    return instanceToInstance(user);
  }
}

export { CreateUserService };

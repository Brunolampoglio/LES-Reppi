import { instanceToInstance } from 'class-transformer';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';

import { Roles } from '@shared/enum/Roles';
import { AppError } from '@shared/error/AppError';
import { IHashProvider } from '@shared/container/providers/HashProvider/model/IHashProvider';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { ICreateUserDTO } from './dto/CreateUserDTO';

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
    role = Roles.user,
  }: ICreateUserDTO): Promise<User> {
    const user_exists = await this.userRepository.findBy({ email });

    if (user_exists) throw new AppError('Email já cadastrado');

    const hashed_password = await this.hashProvider.generateHash(password);

    const user = this.userRepository.create({
      name,
      email,
      password: hashed_password,
      role,
    });

    await this.userRepository.save(user);

    return instanceToInstance(user);
  }
}

export { CreateUserService };

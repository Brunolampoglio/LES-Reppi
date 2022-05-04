import { instanceToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import { Roles } from '@shared/enum/Roles';
import { AppError } from '@shared/error/AppError';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { ICreateUserDTO } from './CreateUserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    role = Roles.user,
  }: ICreateUserDTO): Promise<User> {
    const user_exists = await this.userRepository.findBy({ email });
    if (user_exists) throw new AppError('Email já cadastrado');

    const user = this.userRepository.create({ name, email, password, role });

    await this.userRepository.save(user);

    return instanceToInstance(user);
  }
}

export { CreateUserService };

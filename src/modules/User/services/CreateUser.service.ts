import { inject, injectable } from 'tsyringe';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { ICreateUserDTO } from './CreateUserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ email, password }: ICreateUserDTO): Promise<User> {
    const user = this.userRepository.create({ email, password });

    await this.userRepository.save(user);

    return user;
  }
}

export { CreateUserService };

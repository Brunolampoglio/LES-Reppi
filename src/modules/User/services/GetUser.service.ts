import { AppError } from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/UserRepository.interface';

@injectable()
class GetUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const user = await this.userRepository.index();

    if (!user) {
      throw new AppError('Não foi possível encontrar usuários.');
    }

    return user;
  }
}

export { GetUserService };

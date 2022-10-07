import { AppError } from '@shared/error/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';

import { User } from '../entities/User';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IUpdateUserDTO } from './dto/UpdateUserDTO';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
    request_id,
    ...userParams
  }: IUpdateUserDTO): Promise<User> {
    if (request_id !== user_id)
      throw new AppError('Usuário não autorizado', 404);

    const user = await this.userRepository.findBy({
      id: user_id,
    });

    if (!user) throw new AppError('Usuário não encontrado', 404);

    Object.assign(user, userParams);

    const newUser = await this.userRepository.save(user);

    return newUser;
  }
}

export { UpdateUserService };

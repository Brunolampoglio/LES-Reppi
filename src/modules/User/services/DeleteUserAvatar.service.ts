import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IDeleteUserAvatarDTO } from './DeleteUserAvatarDTO';

@injectable()
class DeleteUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
    request_id,
  }: IDeleteUserAvatarDTO): Promise<User> {
    if (request_id !== user_id)
      throw new AppError('Usuário não autorizado', 404);

    const user = await this.userRepository.findBy({
      id: user_id,
    });

    if (!user) throw new AppError('Usuário não encontrado', 404);

    user.avatar = null;

    const newUser = await this.userRepository.save(user);

    return newUser;
  }
}

export { DeleteUserAvatarService };

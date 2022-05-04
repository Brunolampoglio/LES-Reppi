import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IUpdateUserAvatarDTO } from './UpdateUserAvatarDTO';

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    request_id,
    avatarFilename,
  }: IUpdateUserAvatarDTO): Promise<User> {
    if (request_id !== user_id)
      throw new AppError('Usuário não autorizado', 404);

    const user = await this.userRepository.findBy({
      id: user_id,
    });

    if (!user) throw new AppError('Usuário não encontrado', 404);

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    const newUser = await this.userRepository.save(user);

    return newUser;
  }
}

export { UpdateUserAvatarService };

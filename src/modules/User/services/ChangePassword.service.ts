import { inject, injectable } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import { compare } from 'bcrypt';

import { AppError } from '@shared/error/AppError';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IChangePasswordDTO } from './ChangePasswordDTO';
import { User } from '../entities/User';

@injectable()
class ChangePasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    old_password,
    new_password,
    user_id,
    request_id,
  }: IChangePasswordDTO): Promise<User> {
    if (request_id !== user_id)
      throw new AppError('Usuário não autorizado', 404);

    const user = await this.userRepository.findBy({ id: user_id });

    if (!user) throw new AppError('Usuário não encontrado', 404);

    const passwordMatched = await compare(old_password, user.password);

    if (!passwordMatched) throw new AppError('Senha inválida', 401);

    user.password = new_password;

    const new_user = await this.userRepository.save(user);

    return instanceToInstance(new_user);
  }
}

export { ChangePasswordService };

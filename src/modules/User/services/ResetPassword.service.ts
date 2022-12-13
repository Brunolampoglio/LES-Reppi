import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';
import { IRedisProvider } from '@shared/container/providers/RedisProvider/model/IRedisProvider';
import { password_forget } from '@config/password';
import { hashSync } from 'bcrypt';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IResetPasswordDTO } from './dto/ResetPasswordDTO';


@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('RedisProvider')
    private redisProvider: IRedisProvider,
  ) {}

  public async execute({
    token,
    new_password,
  }: IResetPasswordDTO): Promise<void> {
    const user_id = await this.redisProvider.get(
      `${password_forget.prefix}${token}`,
    );

    if (!user_id) throw new AppError('Token inválido');

    await this.redisProvider.del(`${password_forget.prefix}${token}`);

    const user = await this.userRepository.findBy({
      id: user_id,
    });

    if (!user) throw new AppError('Usuário não encontrado');

    user.password = hashSync(new_password, 8);

    await this.userRepository.save(user);
  }
}

export { ResetPasswordService };

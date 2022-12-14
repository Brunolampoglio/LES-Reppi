import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/error/AppError';
import { IRedisProvider } from '@shared/container/providers/RedisProvider/model/IRedisProvider';
import { password_forget } from '@config/password';
import { hashSync } from 'bcrypt';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IConfirmEmailDTO } from './dto/ConfirmeEmailDTO';


@injectable()
class ConfirmEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('RedisProvider')
    private redisProvider: IRedisProvider,
  ) {}

  public async execute({
    token,
  }: IConfirmEmailDTO): Promise<void> {
    const email_user = await this.redisProvider.get(
      `${password_forget.prefix}${token}`,
    );

    if (!email_user) throw new AppError('Token inválido');

    await this.redisProvider.del(`${password_forget.prefix}${token}`);

    const user = await this.userRepository.findBy({
      email: email_user,
    });

    if (!user) throw new AppError('Usuário não encontrado');

    user.status = true;

    await this.userRepository.save(user);
  }
}

export { ConfirmEmailService };

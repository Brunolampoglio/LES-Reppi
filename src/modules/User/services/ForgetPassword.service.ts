import { v4 as uuidV4 } from 'uuid';
import { inject, injectable } from 'tsyringe';
import path from 'path';

import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import { AppError } from '@shared/error/AppError';
import { IRedisProvider } from '@shared/container/providers/RedisProvider/model/IRedisProvider';
import { password_forget } from '@config/password';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IForgotPasswordDTO } from './ForgotPasswordDTO';

@injectable()
class ForgotPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('RedisProvider')
    private redisProvider: IRedisProvider,
  ) {}

  public async execute({ email }: IForgotPasswordDTO): Promise<void> {
    const user = await this.userRepository.findBy({ email });

    if (!user) throw new AppError('Usuário não encontrado');

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    const token = uuidV4();

    await this.redisProvider.set({
      key: `${password_forget.prefix}${token}`,
      value: user.id,
      time: password_forget.expiresIn,
      option: 'EX',
    });

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Mestres da Web] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}

export { ForgotPasswordService };

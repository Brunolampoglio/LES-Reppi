import { instanceToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import path from 'path';


import { AppError } from '@shared/error/AppError';
import { IHashProvider } from '@shared/container/providers/HashProvider/model/IHashProvider';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { ICreateUserDTO } from './dto/CreateUserDTO';
import { Address } from '../entities/Address';
import { Roles } from '@shared/enum/Roles';
import { password_forget } from '@config/password';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import { IRedisProvider } from '@shared/container/providers/RedisProvider/model/IRedisProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('RedisProvider')
    private redisProvider: IRedisProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    role,
    corporate_name,
    cnpj,
    cpf,
    position,
    gestor_id,
    address,
    phone_number,
  }: ICreateUserDTO): Promise<User> {
    const [user_exists, user_existsCnpj, user_existsCpf] = await Promise.all([
      this.userRepository.findBy({
        email,
      }),
      this.userRepository.findBy({ cnpj }),
      this.userRepository.findBy({ cpf }),
    ]);

    if (user_exists || user_existsCnpj || user_existsCpf)
      throw new AppError('Usuário já cadastrado');

    const hashed_password = await this.hashProvider.generateHash(password);
    const addressInstance = new Address();

    const user = this.userRepository.create({
      name,
      email,
      password: hashed_password,
      role,
      corporate_name,
      cnpj,
      cpf,
      position,
      gestor_id: gestor_id || undefined,
      phone_number,
    });

    if(address) {
      Object.assign(addressInstance, { ...address });
      user.address = addressInstance;
    }

    if(role === Roles.user){
      user.status = false;

      const confirmEmail = path.resolve(
        __dirname,
        '..',
        'views',
        'confirm_email.hbs',
      );

      const token = Math.floor((Math.random() * 90000) + 100)

      await this.redisProvider.set({
        key: `${password_forget.prefix}${token}`,
        value: user.email,
        time: password_forget.expiresIn,
        option: 'EX',
      });


      await this.mailProvider.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: '[Hbaw] Confirme seu e-mail',
        templateData: {
          file: confirmEmail,
          variables: {
            name: user.name,
            token,
          },
        },
      });
    }

    await this.userRepository.save(user);
    return instanceToInstance(user);
  }
}

export { CreateUserService };

import { v4 as uuidV4 } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import { compare } from 'bcrypt';

import { AppError } from '@shared/error/AppError';
import { IRedisProvider } from '@shared/container/providers/RedisProvider/model/IRedisProvider';
import { refreshToken_config } from '@config/auth';
import { Roles } from '@shared/enum/Roles';
import { jwtGenerate } from '@shared/util/jwtGenerate';
import { IUserRepository } from '../repositories/UserRepository.interface';
import {
  ICreateSessionDTO,
  ICreateSessionResponseDTO,
} from './dto/CreateSessionDTO';

@injectable()
class CreateSessionService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('RedisProvider')
    private redisProvider: IRedisProvider,
  ) {}

  public async execute({
    email,
    password,
    device_token,
    remember_me = false,
    role,
  }: ICreateSessionDTO): Promise<ICreateSessionResponseDTO> {
    const user = await this.userRepository.findBy({ email });

    if (!user) throw new AppError('Email ou senha inválidos', 404);


    switch(role) {
      case Roles.master:
        if (user.role !== Roles.master) throw new AppError('Email ou senha inválidos', 401);
        break;
      case Roles.gestor:
        if (user.role !== Roles.gestor && user.role !== Roles.employee) throw new AppError('Email ou senha inválidos 2', 401);
        break;
      case Roles.user:
        if (user.role !== Roles.user) throw new AppError('Email ou senha inválidos', 401);
        break;
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw new AppError('Email ou senha inválidos', 401);

    const jwToken = jwtGenerate(user.id, user.role === Roles.master);

    const refreshToken = remember_me ? uuidV4() : undefined;

    if (refreshToken) {
      await this.redisProvider.set({
        key: `${refreshToken_config.prefix}${refreshToken}`,
        value: user.id,
        time: refreshToken_config.expiresIn,
        option: 'EX',
      });
    }

    if (device_token) {
      user.device_token = device_token;

      await this.userRepository.save(user);
    }

    return {
      user: instanceToInstance(user),
      access_token: jwToken,
      refresh_token: refreshToken,
    };
  }
}

export { CreateSessionService };

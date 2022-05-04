import { v4 as uuidV4 } from 'uuid';
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
} from './CreateSessionDTO';

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
    remember_me = false,
  }: ICreateSessionDTO): Promise<ICreateSessionResponseDTO> {
    const user = await this.userRepository.findBy({ email });
    if (!user) throw new AppError('Email ou senha inválidos', 404);

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

    return {
      user: instanceToInstance(user),
      access_token: jwToken,
      refresh_token: refreshToken,
    };
  }
}

export { CreateSessionService };

import { inject, injectable } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import { compare } from 'bcrypt';
import { AppError } from '@shared/error/AppError';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { ICreateSessionDTO, ICreateSessionResponseDTO } from './dto/CreateSessionDTO';
import { jwtGenerate } from '@shared/util/jwtGenerate';


@injectable()
class CreateSessionService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSessionDTO): Promise<ICreateSessionResponseDTO> {

   const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError('Email ou senha inválidos', 401);

    if (user) {
      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) throw new AppError('Email ou senha inválidos', 401);
    }

    if (!user?.status) {
      throw new AppError('Procure o administrador da plataforma', 403);
    }

    const jwToken = jwtGenerate(
      user.id  as string,
      user.role  === 'User',
    );

    return {
      user: instanceToInstance(user),
      access_token: jwToken,
    };
  }
}

export { CreateSessionService };

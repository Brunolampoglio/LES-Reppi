import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

import { User } from '../entities/User';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IUPdateEmployeeDTO, IUpdateUserDTO } from './dto/UpdateUserDTO';

@injectable()
class UpdateEmployeeService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
    request_id,
    ...userParams
  }: IUPdateEmployeeDTO): Promise<User> {


    const user = await this.userRepository.findBy({
      id: user_id,
    });

    if (!user) throw new AppError('Usuário não encontrado', 404);

    if(user.gestor_id !== request_id) throw new AppError('Você não tem permissão para atualizar este usuário', 403);

    Object.assign(user, userParams);

     await this.userRepository.save(user);

    return user;
  }
}

export { UpdateEmployeeService };

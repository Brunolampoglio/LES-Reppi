import { Roles } from '@shared/enum/Roles';
import { AppError } from '@shared/error/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '../repositories/UserRepository.interface';
import { IDeleteUserDTO } from './dto/DeleteUserDTO';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ user_id, isMaster, gestor_id}: IDeleteUserDTO): Promise<void> {

    const gestor = await this.userRepository.findBy({ id: gestor_id });

    if (!isMaster && (gestor?.role !== Roles.gestor) && (gestor?.role !== Roles.employee)) {
      throw new AppError('Usuário não autorizado', 404);
    }

    const user = await this.userRepository.findBy({ id: user_id });

    if (!user) throw new AppError('Usuário não encontrado', 404);

    await this.userRepository.remove(user);
  }
}

export { DeleteUserService };

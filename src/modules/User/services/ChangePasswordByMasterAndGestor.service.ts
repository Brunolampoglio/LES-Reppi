import { inject, injectable } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import { compare } from 'bcrypt';

import { AppError } from '@shared/error/AppError';
import { IHashProvider } from '@shared/container/providers/HashProvider/model/IHashProvider';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IChangePasswordDTO } from './dto/ChangePasswordDTO';
import { User } from '../entities/User';
import { IChangePasswordByMasterAndGestorDTO } from './dto/ChangePasswordByMasterAndGestorDTO';
import { Roles } from '@shared/enum/Roles';

@injectable()
class ChangePasswordByMasterAndGestorService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    new_password,
    user_id,
    request_id,
  }: IChangePasswordByMasterAndGestorDTO): Promise<User> {

    const gestor = await this.userRepository.findBy({ id: request_id });

    if (!gestor) throw new AppError('Usuário não encontrado', 404);

    if(gestor.role !== Roles.master){
        if(gestor.role !== Roles.gestor){
            throw new AppError('Usuário não autorizado', 404);
        }
        throw new AppError('Usuário não autorizado', 404);
    }

    const user = await this.userRepository.findBy({ id: user_id });

    if (!user) throw new AppError('Usuário não encontrado', 404);


    const hash_password = await this.hashProvider.generateHash(new_password);

    user.password = hash_password;

    const new_user = await this.userRepository.save(user);

    return instanceToInstance(new_user);
  }
}
export { ChangePasswordByMasterAndGestorService };

/* eslint-disable prettier/prettier */
import { instanceToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IUpdateUserStatusDTO } from './dto/UpdateUserDTO';

@injectable()
class UpdateUserStatusService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) { }

  public async execute({
    user_id,
    status,
  }: IUpdateUserStatusDTO): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new Error('Usuário não encontrado');

    Object.assign(user, {
      status,
    });

    await this.userRepository.save(user);

    return instanceToInstance(user);
  }
}

export { UpdateUserStatusService };

import { compare } from 'bcrypt';
import { instanceToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import { User } from '../entities/User';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IUpdateUserDTO } from './dto/UpdateUserDTO';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

  ) {}

  public async execute({
    user_id,
    birth_date,
    cpf,
    email,
    gender,
    name,
    phone,
    type_phone,
  }: IUpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(
     user_id,
    );

    if (!user) throw new Error('Usuário não encontrado');

    Object.assign(user,{
      birth_date,
      cpf,
      email,
      gender,
      name,
      phone,
      type_phone,
    });

    await this.userRepository.save(user);

    return instanceToInstance(user);
  }
}

export { UpdateUserService };

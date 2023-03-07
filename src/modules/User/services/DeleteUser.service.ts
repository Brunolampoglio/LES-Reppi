import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '../repositories/UserRepository.interface';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    await this.userRepository.delete(user);
  }
}

export { DeleteUserService };

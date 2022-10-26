import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IListUserDTO } from './dto/ListUserDTO';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    page,
    limit,
    role,
  }: IListUserDTO): Promise<IPaginatedResponse<User>> {
    const user = await this.usersRepository.listBy({
      filters: {
        role,
      },
      page,
      limit,
    });

    return {
      results: user.results,
      limit: user.limit,
      page: user.page,
      total: user.total,
    };
  }
}
export { ListUserService };

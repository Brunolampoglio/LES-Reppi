import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IListUserDTO } from './dto/ListUserDTO';

@injectable()
class ListUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    page,
    limit,
  }: IListUserDTO): Promise<IPaginatedResponse<User>> {
    const user = await this.userRepository.listByUser({
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

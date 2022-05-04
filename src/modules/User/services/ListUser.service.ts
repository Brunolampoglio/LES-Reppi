import { instanceToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/UserRepository.interface';

@injectable()
class ListUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    page,
    limit,
  }: IPaginatedRequest<User>): Promise<IPaginatedResponse<User>> {
    const users = await this.userRepository.listBy({
      page,
      limit,
    });

    return {
      results: instanceToInstance(users.results),
      limit: users.limit,
      page: users.page,
      total: users.total,
    };
  }
}

export { ListUserService };

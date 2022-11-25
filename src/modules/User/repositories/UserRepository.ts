
import { IPaginatedRequest } from 'src/shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from 'src/shared/interfaces/IPaginatedResponse';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { IUserCreate } from './dto/UserRepositoryDTO';
import { IUserRepository } from './UserRepository.interface';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findBy(filter: Partial<User>): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(filter);

    return user;
  }

  public async listByUser({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<User>): Promise<IPaginatedResponse<User>> {
    const users = await this.ormRepository.find({
      where: {role:'Paciente'},
      skip: (page - 1) * limit,
      take: limit,
    });

    const userTotal = await this.ormRepository.count(filters);

    return {
      results: users,
      total: userTotal,
      page,
      limit,
    };
  }

  public async listCorporate({ page = 1, limit = 10 }: IPaginatedRequest<User>): Promise<IPaginatedResponse<User>> {
    const users = await this.ormRepository.find({
      where: {role:'Gestor'},
      skip: (page - 1) * limit,
      take: limit,
    });

    const userTotal = await this.ormRepository.count();

    return {
      results: users,
      total: userTotal,
      page,
      limit,
    };
  }

  public async listEmployee({ page = 1, limit = 10, gestor_id}: IPaginatedRequest<User> & {gestor_id: string}): Promise<IPaginatedResponse<User>> {
    const users = await this.ormRepository.find({
      where: { gestor_id },
      skip: (page - 1) * limit,
      take: limit,
    });

    const userTotal = await this.ormRepository.count();

    return {
      results: users,
      total: userTotal,
      page,
      limit,
    };
  }

  create({
    name,
    email,
    password,
    role,
    cnpj,
    cpf,
    corporate_name,
    position,
    gestor_id,
    phone_number
  }: IUserCreate): User {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      role,
      cnpj,
      cpf,
      corporate_name,
      position,
      gestor_id,
      phone_number,
    });

    return user;
  }

  async save(user: User): Promise<User> {
    const newUser = await this.ormRepository.save(user);

    return newUser;
  }

  async remove(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }
}

export { UserRepository };

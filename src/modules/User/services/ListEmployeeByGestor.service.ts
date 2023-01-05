import { AppError } from "@shared/error/AppError";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/UserRepository.interface";
import { IListUserDTO } from "./dto/ListUserDTO";

@injectable()
class ListEmployeeByGestorService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  public async execute({
    page,
    limit,
    gestor_id,
    isMaster,
  }: IListUserDTO): Promise<IPaginatedResponse<User>> {

    const gestor = await this.userRepository.findBy({ id: gestor_id });

    if (!gestor) {
      throw new AppError("Gestor não encontrado", 404);
    }

    const user = await this.userRepository.listEmployee({
      page,
      limit,
      gestor_id: gestor.id,
    });

    return {
      results: user.results,
      limit: user.limit,
      page: user.page,
      total: user.total,
    };
  }
}

export { ListEmployeeByGestorService };

import { AppError } from "@shared/error/AppError";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/UserRepository.interface";
import { IListUserDTO } from "./dto/ListUserDTO";

@injectable()
class ListGestorService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  public async execute({
    page,
    limit,
    isMaster,
  }: IListUserDTO): Promise<IPaginatedResponse<User>> {
    if (!isMaster) {
      throw new AppError("Usuário não autorizado", 404);
    }

    const user = await this.userRepository.listCorporate({
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
export { ListGestorService };

import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/UserRepository.interface";

@injectable()
class UpdateStatusService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  public async execute({
    user_id,
    isMaster,
    status,
  }: IChangeStatusDTO): Promise<User> {
    if (!isMaster) {
      throw new AppError("Usuário não autorizado", 404);
    }

    const user = await this.userRepository.findBy({ id: user_id });

    if (!user) throw new AppError("Usuário não encontrado", 404);

    user.status = status;

    const newUser = await this.userRepository.save(user);

    return newUser;
  }
}
export { UpdateStatusService };

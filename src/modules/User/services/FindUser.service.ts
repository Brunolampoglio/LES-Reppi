import { injectable, inject } from "tsyringe";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/UserRepository.interface";

@injectable()
class FindUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) { }

    public async execute(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return user;

    }
}

export { FindUserService };
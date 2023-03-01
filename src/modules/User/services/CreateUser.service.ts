import { inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/UserRepository.interface";
import { ICreateUserDTO } from "./dto/CreateUserDTO";

@injectable()
class CreateUserService{
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute({
        name,
        email,
        password,
        cpf,
        phone,
    }: ICreateUserDTO): Promise<User> {
        const userExists = await this.userRepository.findByEmail(email);
       
        if (userExists) {
            throw new Error("Usuário já existe!");
        }
        const user = this.userRepository.create({
            name,
            email,
            password,
            cpf,
            phone,
            status: 'ativo',
            role: 'user',
        });

        await this.userRepository.save(user);
        return user;
    }
}
export { CreateUserService };
import { User } from "../entities/User";
import { ICreateUserRepositoryDTO } from "./dto/CreateUserRepositoryDTO";

interface IUserRepository {
    create(user: ICreateUserRepositoryDTO): User;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    index(): Promise<User[]>;
    save(user: User): Promise<User>;
    delete(user: User): Promise<void>;
}
export { IUserRepository };
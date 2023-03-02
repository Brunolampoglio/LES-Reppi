import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { ICreateUserRepositoryDTO } from "./dto/CreateUserRepositoryDTO";
import { IUserRepository } from "./UserRepository.interface";

class UserRepository implements IUserRepository{
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;
    }


     create({
        name,
        email,
        password,
        cpf,
        phone,
        status,
        role,
        birth_date,
        gender,
        type_phone,
    }: ICreateUserRepositoryDTO): User {
        const user = this.ormRepository.create({
            name,
            email,
            password,
            cpf,
            phone,
            status,
            role,
            birth_date,
            gender,
            type_phone,
        });

        return user;
    }

    async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }
    
    index(): Promise<User[]> {
        return this.ormRepository.find();
    }

    async save(user: User): Promise<User> {
        const newUser = await this.ormRepository.save(user);

        return newUser;

    }

    async delete(user: User): Promise<void> {
        await this.ormRepository.delete(user);
    }
   
}
export { UserRepository };
import { Address } from "@modules/Address/entities/Address";
import { IAddressRepository } from "@modules/Address/repositories/AddressRepository.interface";
import { inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/UserRepository.interface";
import { ICreateUserDTO } from "./dto/CreateUserDTO";

@injectable()
class CreateUserService{
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,

        @inject('AddressRepository')
        private addressRepository: IAddressRepository,
    ) {}

    public async execute({
        name,
        email,
        password,
        cpf,
        phone,
        birth_date,
        gender,
        type_phone,
        address,
    }: ICreateUserDTO): Promise<User> {
        const userExists = await this.userRepository.findByEmail(email);
       
        if (userExists) {
            throw new Error("Usuário já existe!");
        }

        const addressInstance = new Address();
        const user = this.userRepository.create({
            name,
            email,
            password,
            cpf,
            phone,
            status: 'ativo',
            role: 'user',
            gender,
            birth_date,
            type_phone,
        });

        if (address) {
            Object.assign(addressInstance, 
            {  ...address, 
            user_id: user.id 
            });
        }

        await this.userRepository.save(user);
        return user;
    }
}
export { CreateUserService };
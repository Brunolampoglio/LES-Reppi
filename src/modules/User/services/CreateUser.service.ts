import { Address } from "@modules/Address/entities/Address";
import { IAddressRepository } from "@modules/Address/repositories/AddressRepository.interface";
import { inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import bcrypt from 'bcrypt';
import { IUserRepository } from "../repositories/UserRepository.interface";
import { ICreateUserDTO } from "./dto/CreateUserDTO";
import { AppError } from "@shared/error/AppError";

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
            throw new AppError("Usuário já existe!");
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const addressInstance = new Address();
        const user = this.userRepository.create({
            name,
            email,
            password: hashpassword,
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
            user.address = [addressInstance];
        }

        await this.userRepository.save(user);
        return user;
    }
}
export { CreateUserService };
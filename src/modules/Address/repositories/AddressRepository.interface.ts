import { Address } from "../entities/Address";
import { ICreateAddressRepositoryDTO } from "./dto/CreateAddressDTO";

interface IAddressRepository {
    create(address: ICreateAddressRepositoryDTO): Address;
    findByCep(cep: string): Promise<Address | undefined>;
    index(): Promise<Address[]>;
    save(address: Address): Promise<Address>;
    saveAll(address: Address[]): Promise<Address[]>;
    delete(address: Address): Promise<void>;
}

export { IAddressRepository };
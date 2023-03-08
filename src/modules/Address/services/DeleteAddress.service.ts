import { AppError } from "@shared/error/AppError";
import { injectable, inject } from "tsyringe";
import { IAddressRepository } from "../repositories/AddressRepository.interface";

 @injectable()
class DeleteAddressService {
  constructor(
    @inject("AddressRepository")
    private addressRepository: IAddressRepository,
    
  ) {}

    public async execute(id: string): Promise<void> {
        const address = await this.addressRepository.findById(id);

        if (!address) {
            throw new AppError("Endereço não encontrado", 404);
        }

        await this.addressRepository.delete(address);

    }
}
export { DeleteAddressService };
import { injectable, inject } from 'tsyringe';
import { Address } from '../entities/Address';
import { IAddressRepository } from '../repositories/AddressRepository.interface';

@injectable()
class GetAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute(user_id: string): Promise<Address[]> {
    const address = await this.addressRepository.getAllByUserId(user_id);

    return address;
  }
}

export { GetAddressService };

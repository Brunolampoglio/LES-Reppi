import { AppError } from '@shared/error/AppError';
import { instanceToInstance } from 'class-transformer';
import { injectable, inject } from 'tsyringe';
import { Address } from '../entities/Address';
import { IAddressRepository } from '../repositories/AddressRepository.interface';

@injectable()
class ShowAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute(address_id: string): Promise<Address> {
    const address = await this.addressRepository.showAddressId(address_id);

    if (!address) {
      throw new AppError('Endereço não encontrado', 404);
    }

    return instanceToInstance(address);
  }
}

export { ShowAddressService };

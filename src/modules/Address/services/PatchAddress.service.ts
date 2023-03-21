/* eslint-disable prettier/prettier */
import { AppError } from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import { IAddressRepository } from '../repositories/AddressRepository.interface';

@injectable()
class PatchAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) { }

  public async execute(address_id: string, user_id: string): Promise<void> {
    const addresses = await this.addressRepository.getAllByUserId(user_id);

    const has_address = addresses.some(
      address => address.id_address === address_id,
    );

    if (!has_address) {
      throw new AppError('Endereço não encontrado', 404);
    }

    addresses.forEach(addressItem => {
      if (addressItem.id_address === address_id) {
        addressItem.is_default = true;

        return;
      }

      addressItem.is_default = false;
    });

    await this.addressRepository.saveAll(addresses);
  }
}
export { PatchAddressService };

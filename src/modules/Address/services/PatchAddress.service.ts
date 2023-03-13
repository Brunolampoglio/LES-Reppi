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

  public async execute(
    address_id: string,
    user_id: string,
  ): Promise<void> {
    const address = await this.addressRepository.findById(address_id);
    const addresses = await this.addressRepository.getAllByUserId(user_id);

    if (!address) {
      throw new AppError('Endereço não encontrado', 404);
    }

    addresses.forEach(async addressItem => {
      await this.addressRepository.save({
        ...addressItem,
        is_default: false,
      });
    });

    Object.assign(address, {
      is_default: true,
    });

    await this.addressRepository.save(address);
  }
}
export { PatchAddressService };

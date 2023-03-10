import { AppError } from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import { IAddressRepository } from '../repositories/AddressRepository.interface';
import { IUpdateAddressDTO } from './dto/UpdateAddressDTO';

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({
    city,
    country,
    is_default,
    neighborhood,
    number,
    obs,
    street,
    street_type,
    type_residence,
    uf,
    address_id,
    zip,
  }: IUpdateAddressDTO): Promise<void> {
    const address = await this.addressRepository.findById(address_id);

    if (!address) {
      throw new AppError('Endereço não encontrado', 404);
    }

    Object.assign(address, {
      city,
      country,
      is_default,
      neighborhood,
      number,
      obs,
      street,
      street_type,
      type_residence,
      uf,
      zip,
    });

    await this.addressRepository.save(address);
  }
}
export { UpdateAddressService };

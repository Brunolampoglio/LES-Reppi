import { inject, injectable } from 'tsyringe';
import { Address } from '../entities/Address';
import { IAddressRepository } from '../repositories/AddressRepository.interface';
import { ICreateAddressDTO } from './dto/CreateAddressDTO';

@injectable()
class CreateAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) { }

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
    user_id,
    zip,
  }: ICreateAddressDTO): Promise<Address> {
    const addresses = await this.addressRepository.getAllByUserId(user_id);

    if (is_default) {
      addresses.forEach(async addressItem => {
        await this.addressRepository.save({
          ...addressItem,
          is_default: false,
        });
      });
    }

    const address = this.addressRepository.create({
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
      user_id,
      zip,
    });

    await this.addressRepository.save(address);
    return address;
  }
}
export { CreateAddressService };

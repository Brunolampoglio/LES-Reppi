import { getRepository, Repository } from 'typeorm';
import { Address } from '../entities/Address';
import { IAddressRepository } from './AddressRepository.interface';
import { ICreateAddressRepositoryDTO } from './dto/CreateAddressDTO';

class AddressRepository implements IAddressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async findByCep(cep: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: { cep },
    });

    return address;
  }

  public async getAllByUserId(user_id: string): Promise<Address[]> {
    const addresses = await this.ormRepository.find({
      where: { user_id },
    });

    return addresses;
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: { id_address: id },
    });

    return address;
  }

  create({
    city,
    number,
    obs,
    street,
    street_type,
    type_residence,
    country,
    is_default,
    neighborhood,
    uf,
    user_id,
    zip,
  }: ICreateAddressRepositoryDTO): Address {
    const address = this.ormRepository.create({
      city,
      number,
      obs,
      street,
      street_type,
      country,
      is_default,
      neighborhood,
      type_residence,
      uf,
      user_id,
      zip,
    });

    return address;
  }

  index(): Promise<Address[]> {
    return this.ormRepository.find();
  }

  async save(address: Address): Promise<Address> {
    const newAddress = await this.ormRepository.save(address);

    return newAddress;
  }

  async saveAll(address: Address[]): Promise<Address[]> {
    const newAddress = await this.ormRepository.save(address);

    return newAddress;
  }

  async delete(address: Address): Promise<void> {
    await this.ormRepository.delete(address.id_address);
  }
}
export { AddressRepository };

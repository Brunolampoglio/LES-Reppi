import { inject, injectable } from 'tsyringe';
import { Cupon } from '../entities/Cupon';
import { ICuponRepository } from '../repositories/CuponRepository.interface';
import { ICreateCuponDTO } from './dto/CreateCuponDTO';

@injectable()
class CreateCuponService {
  constructor(
    @inject('CuponRepository')
    private cuponRepository: ICuponRepository,
  ) {}

  public async execute({
    name,
    description,
    value,
    active,
  }: ICreateCuponDTO): Promise<Cupon> {
    const cupon = this.cuponRepository.create({
      name,
      description,
      value,
      active,
    });

    await this.cuponRepository.save(cupon);

    return cupon;
  }
}
export { CreateCuponService };

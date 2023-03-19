import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { Cupon } from '../entities/Cupon';
import { ICuponRepository } from '../repositories/CuponRepository.interface';
import { IUpdateCuponDTO } from './dto/UpdateCuponDTO';

@injectable()
class UpdateCuponService {
  constructor(
    @inject('CuponRepository')
    private cuponRepository: ICuponRepository,
  ) {}

  public async execute({
    active,
    cupon_id,
    description,
    name,
    value,
  }: IUpdateCuponDTO): Promise<Cupon> {
    const cupon = await this.cuponRepository.findById(cupon_id);

    if (!cupon) {
      throw new AppError('Cupon não encontrado!', 404);
    }

    Object.assign(cupon, {
      active,
      description,
      name,
      value,
    });

    await this.cuponRepository.save(cupon);

    return cupon;
  }
}
export { UpdateCuponService };

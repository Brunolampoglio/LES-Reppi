import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { ICuponRepository } from '../repositories/CuponRepository.interface';
import { IDeleteCuponDTO } from './dto/DeleteCuponDTO';

@injectable()
class DeleteCuponService {
  constructor(
    @inject('CuponRepository')
    private cuponRepository: ICuponRepository,
  ) {}

  public async execute({ cupon_id }: IDeleteCuponDTO): Promise<void> {
    const cupon = await this.cuponRepository.findById(cupon_id);

    if (!cupon) {
      throw new AppError('Cupon não encontrado!', 404);
    }

    await this.cuponRepository.remove(cupon);
  }
}
export { DeleteCuponService };

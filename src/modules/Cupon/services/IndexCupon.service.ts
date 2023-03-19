import { inject, injectable } from 'tsyringe';
import { Cupon } from '../entities/Cupon';
import { ICuponRepository } from '../repositories/CuponRepository.interface';

@injectable()
class IndexCuponService {
  constructor(
    @inject('CuponRepository')
    private cuponRepository: ICuponRepository,
  ) {}

  public async execute(): Promise<Cupon[]> {
    const cupons = await this.cuponRepository.index();

    return cupons;
  }
}

export { IndexCuponService };

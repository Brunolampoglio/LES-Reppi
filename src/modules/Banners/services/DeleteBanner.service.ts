import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { IBannerRepository } from '../repositories/BannerRepositories.interface';
import { IDeleteBannerDTO } from './dto/DeleteBannerDTO';

@injectable()
class DeleteBannerService {
  constructor(
    @inject('BannerRepository')
    private bannerRepository: IBannerRepository,
  ) {}

  public async execute({
    banner_id,
    isMaster,
  }: IDeleteBannerDTO): Promise<void> {
    if (!isMaster) throw new AppError('Usuário não autorizado', 401);

    const banner = await this.bannerRepository.findBy({ id: banner_id });

    if (!banner) throw new AppError('Banner não encontrado', 404);

    await this.bannerRepository.remove(banner);
  }
}
export { DeleteBannerService };

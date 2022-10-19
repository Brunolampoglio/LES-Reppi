import { AppError } from '@shared/error/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import { Banner } from '../entities/Banner';
import { IBannerRepository } from '../repositories/BannerRepositories.interface';
import { IUpdateBannerDTO } from './dto/UpdateBannerDTO';

@injectable()
class UpdateBannerService {
  constructor(
    @inject('BannersRepository')
    private bannersRepository: IBannerRepository,
  ) {}

  public async execute({
    id,
    isMaster,
    dt_Final,
    dt_Initial,
    image,
    link_Banner,
    link_Image,
    name,
    userId,
  }: IUpdateBannerDTO): Promise<Banner> {
    if (isMaster) throw new AppError('Usuário não autorizado', 404);

    const banner = await this.bannersRepository.findBy({
      id,
    });

    if (!banner) throw new AppError('Banner não encontrado', 404);

    Object.assign(banner, {
      dt_Final,
      dt_Initial,
      image,
      link_Banner,
      link_Image,
      name,
      userId,
    });

    const newBanner = await this.bannersRepository.save(banner);

    return newBanner;
  }
}
export { UpdateBannerService };

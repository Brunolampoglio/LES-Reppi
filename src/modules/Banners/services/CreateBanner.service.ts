import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { Banner } from '../entities/Banner';
import { IBannerRepository } from '../repositories/BannerRepositories.interface';
import { ICreateBannerDTO } from './dto/CreateBannerDTO';

@injectable()
class CreateBannerService {
  constructor(
    @inject('BannerRepository')
    private bannerRepository: IBannerRepository,
  ) {}

  public async execute({
    name,
    link_banner,
    link_image,
    image,
    dt_final,
    dt_initial,
    user_id,
    isMaster,
  }: ICreateBannerDTO): Promise<Banner> {

    if(!isMaster) {
      throw new AppError('Usuário não autorizado', 404);
    }
    const banner = this.bannerRepository.create({
      name,
      link_banner,
      link_image,
      image,
      dt_final,
      dt_initial,
      user_id,
    });

    await this.bannerRepository.save(banner);

    return banner;
  }
}
export { CreateBannerService };

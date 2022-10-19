// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import { Banner } from '../entities/Banner';
import { IBannerRepository } from '../repositories/BannerRepositories.interface';
import { IBannerCreate } from '../repositories/dto/BannerRepositoryDTO';

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
  }: IBannerCreate): Promise<Banner> {
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

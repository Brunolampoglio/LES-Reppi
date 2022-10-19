import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { getRepository, Repository } from 'typeorm';
import { Banner } from '../entities/Banner';
import { IBannerRepository } from './BannerRepositories.interface';
import { IBannerCreate } from './dto/BannerRepositoryDTO';

class BannerRepository implements IBannerRepository {
  private ormRepository: Repository<Banner>;

  constructor() {
    this.ormRepository = getRepository(Banner);
  }

  async findBy(filter: Partial<Banner>): Promise<Banner | undefined> {
    const banner = await this.ormRepository.findOne(filter);

    return banner;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<Banner>): Promise<IPaginatedResponse<Banner>> {
    const banners = await this.ormRepository.find({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    const bannerTotal = await this.ormRepository.count(filters);

    return {
      results: banners,
      total: bannerTotal,
      page,
      limit,
    };
  }

  create({
    name,
    link_banner,
    link_image,
    image,
    dt_final,
    dt_initial,
    user_id,
  }: IBannerCreate): Banner {
    const banner = this.ormRepository.create({
      name,
      link_banner,
      link_image,
      image,
      dt_final,
      dt_initial,
      user_id,
    });

    return banner;
  }

  async save(banner: Banner): Promise<Banner> {
    const newBanner = await this.ormRepository.save(banner);

    return newBanner;
  }

  async remove(banner: Banner): Promise<void> {
    await this.ormRepository.remove(banner);
  }
}
export { BannerRepository };

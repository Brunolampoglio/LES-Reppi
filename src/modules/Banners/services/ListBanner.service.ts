import { AppError } from '@shared/error/AppError';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import { Banner } from '../entities/Banner';
import { IBannerRepository } from '../repositories/BannerRepositories.interface';
import { IListBannerDTO } from './dto/ListBannerDTO';

@injectable()
class ListBannerService {
  constructor(
    @inject('BannerRepository')
    private bannerRepository: IBannerRepository,
  ) {}

  public async execute({ user_id, isMaster }: IListBannerDTO): Promise<IPaginatedResponse<Banner>> {
    if (!isMaster) throw new AppError('Usuário não autorizado', 404);

    const banners = await this.bannerRepository.listBy({ filters: { user_id } });


    if (!banners) throw new AppError('Banners não encontrados', 404);

    return {
      results: banners.results,
      limit: banners.limit,
      page: banners.page,
      total: banners.total,
    };
  }
}

export { ListBannerService };

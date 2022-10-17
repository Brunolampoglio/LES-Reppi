import { AppError } from '@shared/error/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import { Banner } from '../entities/Banner';
import { IBannerRepository } from '../repositories/BannerRepositories.interface';
import { IListBannerDTO } from './dto/ListBannerDTO';

@injectable()
class ListBannerService {
  constructor(
    @inject('BannersRepository')
    private bannersRepository: IBannerRepository,
  ) {}

  public async execute({ user_id, isMaster }: IListBannerDTO): Promise<Banner> {
    if (!isMaster) throw new AppError('Usuário não autorizado', 404);

    const banners = await this.bannersRepository.findBy({
      id: user_id,
    });

    if (!banners) throw new AppError('Banners não encontrados', 404);

    return banners;
  }
}

export { ListBannerService };

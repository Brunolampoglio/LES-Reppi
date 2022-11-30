import { AppError } from '@shared/error/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import { IBannerRepository } from '../repositories/BannerRepositories.interface';
import { IDeleteBannerDTO } from './dto/DeleteBannerDTo';



@injectable()
class DeleteBannerService {
  constructor(
    @inject('BannersRepository')
    private bannersRepository: IBannerRepository,
  ) {}

  public async execute({
    banner_id,
    isMaster,
  }: IDeleteBannerDTO): Promise<void> {
    if (!isMaster) throw new AppError('Usuário não autorizado', 401);

    const banner = await this.bannersRepository.findBy({ id: banner_id });

    if (!banner) throw new AppError('Banner não encontrado', 404);

    await this.bannersRepository.remove(banner);
  }
}
export { DeleteBannerService };

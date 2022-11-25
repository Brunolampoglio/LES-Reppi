import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { Banner } from '../entities/Banner';
import { IBannerCreate } from './dto/BannerRepositoryDTO';

interface IBannerRepository {
  findBy(filter: Partial<Banner>): Promise<Banner | undefined>;
  listBy(
    filter: IPaginatedRequest<Banner>,
  ): Promise<IPaginatedResponse<Banner>>;
  show(id: string): Promise<IPaginatedResponse<Banner>>;
  create(banner: IBannerCreate): Banner;
  save(banner: Banner): Promise<Banner>;
  remove(banner: Banner): Promise<void>;
}
export { IBannerRepository };

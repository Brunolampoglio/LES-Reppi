import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { inject, injectable } from "tsyringe";
import { Banner } from "../entities/Banner";
import { IBannerRepository } from "../repositories/BannerRepositories.interface";

@injectable()
 class ShowBannerService {
  constructor(
    @inject("BannerRepository")
    private bannerRepository: IBannerRepository
  ) {}

  public async execute({
    id,
  }: IShowBannerDTO): Promise<IPaginatedResponse<Banner>> {
    const banners = await this.bannerRepository.show(id);

    return {
      results: banners.results,
      total: banners.total,
      page: banners.page,
      limit: banners.limit,
    };
  }
}
export { ShowBannerService };

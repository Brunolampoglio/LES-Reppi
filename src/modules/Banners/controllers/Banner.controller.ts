import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateBannerService } from '../services/CreateBanner.service';
import { ListBannerService } from '../services/ListBanner.service';

class BannerController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, link_banner, link_image, image } = req.body;

    const createBannerService = container.resolve(CreateBannerService);

    const banner = await createBannerService.execute({
      name,
      link_banner,
      link_image,
      image,
    });

    return res.status(201).json(banner);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const listBannerService = container.resolve(ListBannerService);

    const banners = await listBannerService.execute({
      user_id: req.user.id,
      isMaster: req.user.isMaster,
    });

    return res.json(banners);
  }
}
export { BannerController };

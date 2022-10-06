import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateBannerService } from '../services/CreateBanner.service';

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
}
export { BannerController };

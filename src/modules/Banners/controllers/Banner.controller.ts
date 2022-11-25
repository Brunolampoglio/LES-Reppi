import { AppError } from '@shared/error/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateBannerService } from '../services/CreateBanner.service';
import { DeleteBannerService } from '../services/DeleteBanner.service';
import { ListBannerService } from '../services/ListBanner.service';
import { ShowBannerService } from '../services/ShowBanner.service';
import { UpdateBannerService } from '../services/UpdateBanner.service';

class BannerController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, link_banner, link_image, dt_final, dt_initial } =
      req.body;

      if (!req.file) throw new AppError('Foto não encontrada');

    const { filename } = req.file;

    const createBannerService = container.resolve(CreateBannerService);

    console.log( name, link_banner, link_image, dt_final, dt_initial);

    const banner = await createBannerService.execute({
      user_id: req.user.id,
      isMaster: req.user.isMaster,
      name,
      link_banner,
      link_image,
      image: filename,
      dt_final,
      dt_initial,
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

  async show(req: Request, res: Response): Promise<Response> {
    const { id_banner } = req.params;

    const showBannerService = container.resolve(ShowBannerService);

    const banner = await showBannerService.execute({
      id: id_banner,
    });

    return res.json(banner);

  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id_banner } = req.params;
    const { name, link_banner, link_image, dt_Initial, dt_Final, image } =
      req.body;

    const updateBannerService = container.resolve(UpdateBannerService);

    const banner = await updateBannerService.execute({
      userId: req.user.id,
      isMaster: req.user.isMaster,
      id: id_banner,
      name,
      link_banner,
      link_image,
      image,
      dt_Initial,
      dt_Final,
    });

    return res.json(banner);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id_banner } = req.params;

    const deleteBannerService = container.resolve(DeleteBannerService);

    await deleteBannerService.execute({
      banner_id: id_banner,
      isMaster: req.user.isMaster,
    });

    return res.status(204).send();
  }
}
export { BannerController };

import { Router } from 'express';
import { BannerController } from '../controllers/Banner.controller';
import { createBannerMiddleware } from './validators/banner.validation';

const bannerRouter = Router();

const bannerController = new BannerController();

bannerRouter.post('/', createBannerMiddleware, bannerController.create);

export { bannerRouter };

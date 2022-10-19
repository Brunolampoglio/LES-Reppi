import { Router } from 'express';
import { verifyToken } from '@shared/middleware/verifyToken';
import { BannerController } from '../controllers/Banner.controller';
import {
  createBannerMiddleware,
  updateBannerMiddleware,
} from './validators/banner.validation';

const bannerRouter = Router();

const bannerController = new BannerController();

bannerRouter.post('/', createBannerMiddleware, bannerController.create);

bannerRouter.get('/', bannerController.list);

bannerRouter.use(verifyToken);

bannerRouter.put('/:id', updateBannerMiddleware, bannerController.update);

export { bannerRouter };

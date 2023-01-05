import { Router } from 'express';
import { verifyToken } from '@shared/middleware/verifyToken';
import { BannerController } from '../controllers/Banner.controller';
import {
  createBannerMiddleware,
  showBannerMiddleware,
  updateBannerMiddleware,
} from './validators/banner.validation';
import multer from 'multer';
import { uploadConfig } from '@config/upload';

const bannerRouter = Router();

const bannerController = new BannerController();

const uploadMulter = multer({
  storage: uploadConfig.multer.storage,
  limits: { fileSize: 200 * 1024 * 1024 },
});

bannerRouter.use(verifyToken);

bannerRouter.post('/',  uploadMulter.single('image'), bannerController.create);

bannerRouter.get('/', bannerController.list);

bannerRouter.get('/show/:id_banner', showBannerMiddleware, bannerController.show);

bannerRouter.put('/:id', updateBannerMiddleware, bannerController.update);

bannerRouter.delete('/:id', bannerController.delete);

export { bannerRouter };

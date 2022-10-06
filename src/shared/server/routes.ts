import { Router, Request, Response, NextFunction } from 'express';

import { userRouter } from '@modules/User/routes/user.routes';
import { planRouter } from '@modules/Plans/routes/plan.routes';
import { bannerRouter } from '@modules/Banners/routes/banner.routes';

const router = Router();

router.use('/user', userRouter);
router.use('/plan', planRouter);
router.use('/banner', bannerRouter);

router.get('/', (request: Request, response: Response) =>
  response.send('Carbon Free - 0.0.1'),
);

router.use((request: Request, response: Response, next: NextFunction) => {
  if (!request.route)
    return response.status(404).send(`${request.url} não encontrado`);
  return next();
});

export { router };

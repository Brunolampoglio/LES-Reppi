import { userRouter } from '@modules/User/routes/user.routes';
import { Router } from 'express';

const router = Router();

router.use(userRouter);

router.get('/', (req, res) => {
  return res.json({
    message: 'Hello World',
  });
});

export { router };

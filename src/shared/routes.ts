import { Router, Request, Response, NextFunction } from 'express';
import { userRouter } from '@modules/User/routes/user.routes';
import { addressRouter } from '@modules/Address/routes/address.routes';
import { flagRouter } from '@modules/Flag/routes/flag.routes';
import { productRouter } from '@modules/Product/routes/product.routes';
import { cardRouter } from '@modules/Cards/routes/card.routes';
import { couponRouter } from '@modules/Cupon/routes/coupon';
import { cartRouter } from '@modules/Cart/routes/cart';
import { invoiceRouter } from '@modules/Invoice/routes/invoice.routes';

const router = Router();

router.use('/user', userRouter);
router.use('/address', addressRouter);
router.use('/flag', flagRouter);
router.use('/product', productRouter);
router.use('/card', cardRouter);
router.use('/coupon', couponRouter);
router.use('/cart', cartRouter);
router.use('/invoice', invoiceRouter);

router.get('/', (request: Request, response: Response) =>
  response.send('Reppi - 0.0.1'),
);

router.use((request: Request, response: Response, next: NextFunction) => {
  if (!request.route)
    return response.status(404).send(`${request.url} não encontrado`);
  return next();
});

export { router };

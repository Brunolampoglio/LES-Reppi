import { verifyToken } from '@shared/middleware/verifyToken';
import { Router } from 'express';
import { AddressController } from '../controllers/Address.controller';
import {
  createAddressMiddleware,
  updateAddressMiddleware,
} from './validators/address.validation';

const addressRouter = Router();

const addressController = new AddressController();

addressRouter.use(verifyToken);

addressRouter.post('/', createAddressMiddleware, addressController.create);

addressRouter.get('/:id', addressController.show);

addressRouter.get('/', addressController.index);

addressRouter.patch('/:address_id/default', addressController.patch);

addressRouter.put(
  '/:address_id',
  updateAddressMiddleware,
  addressController.update,
);

addressRouter.delete('/:address_id', addressController.delete);

export { addressRouter };

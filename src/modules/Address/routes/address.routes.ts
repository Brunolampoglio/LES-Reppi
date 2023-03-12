import { Router } from 'express';
import { AddressController } from '../controllers/Address.controller';
import {
  createAddressMiddleware,
  updateAddressMiddleware,
} from './validators/address.validation';

const addressRouter = Router();

const addressController = new AddressController();

addressRouter.post('/', createAddressMiddleware, addressController.create);

addressRouter.get('/', addressController.index);

addressRouter.put('/:id', updateAddressMiddleware, addressController.update);

addressRouter.delete('/:id', addressController.delete);

export { addressRouter };

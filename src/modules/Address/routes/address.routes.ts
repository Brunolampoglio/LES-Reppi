import { Router } from 'express';
import { AddressController } from '../controllers/Address.controller';

const addressRouter = Router();

const addressController = new AddressController();

addressRouter.post('/', addressController.create);

addressRouter.get('/', addressController.get);

addressRouter.put('/:id', addressController.update);

addressRouter.delete('/:id', addressController.delete);

export { addressRouter };

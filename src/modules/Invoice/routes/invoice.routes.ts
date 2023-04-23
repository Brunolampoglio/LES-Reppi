import { verifyToken } from '@shared/middleware/verifyToken';
import { Router } from 'express';
import { InvoiceController } from '../controllers/Invoice.controllers';
import {
  createInvoiceMiddleware,
  requestExchangeMiddleware,
  showInvoiceMiddleware,
  updateInvoiceMiddleware,
} from './validators/invoice.validation';

const invoiceRouter = Router();

const invoiceController = new InvoiceController();

invoiceRouter.get('/all', invoiceController.indexAll);

invoiceRouter.use(verifyToken);

invoiceRouter.post('/', createInvoiceMiddleware, invoiceController.create);

invoiceRouter.get('/:id', showInvoiceMiddleware, invoiceController.show);

invoiceRouter.patch(
  '/request-exchange/:product_id',
  requestExchangeMiddleware,
  invoiceController.requestExchange,
);

invoiceRouter.get('/', invoiceController.index);

invoiceRouter.put('/:id', updateInvoiceMiddleware, invoiceController.update);

export { invoiceRouter };

import { verifyToken } from '@shared/middleware/verifyToken';
import { Router } from 'express';
import { InvoiceController } from '../controllers/Invoice.controllers';
import {
  createInvoiceMiddleware,
  showInvoiceMiddleware,
  updateInvoiceMiddleware,
} from './validators/invoice.validation';

const invoiceRouter = Router();

const invoiceController = new InvoiceController();

invoiceRouter.use(verifyToken);

invoiceRouter.post('/', createInvoiceMiddleware, invoiceController.create);

invoiceRouter.get('/:id', showInvoiceMiddleware, invoiceController.show);

invoiceRouter.get('/', invoiceController.index);

invoiceRouter.put('/:id', updateInvoiceMiddleware, invoiceController.update);

export { invoiceRouter };

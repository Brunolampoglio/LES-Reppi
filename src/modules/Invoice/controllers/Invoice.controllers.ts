import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateInvoiceService } from '../services/CreateInvoice.service';
import { IndexInvoiceService } from '../services/IndexInvoice.service';
import { ShowInvoiceService } from '../services/ShowInvoice.service';
import { UpdateInvoiceStatusService } from '../services/UpdateStatus.service';

class InvoiceController {
  async create(req: Request, res: Response): Promise<Response> {
    const { address_id, cart_id, discount, freight } = req.body;
    const user_id = req.user.id;

    const createInvoiceService = container.resolve(CreateInvoiceService);

    const invoice = await createInvoiceService.execute({
      address_id,
      cart_id,
      discount,
      freight,
      user_id,
    });
    return res.status(201).json(invoice);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const indexInvoiceService = container.resolve(IndexInvoiceService);

    const invoice = await indexInvoiceService.execute({
      user_id,
    });

    return res.json(invoice);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showInvoiceService = container.resolve(ShowInvoiceService);

    const invoice = await showInvoiceService.execute({
      invoice_id: id,
    });

    return res.json(invoice);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { status } = req.body;
    const { id } = req.params;

    const updateStatusInvoiceService = container.resolve(
      UpdateInvoiceStatusService,
    );

    const invoice = await updateStatusInvoiceService.execute({
      invoice_id: id,
      status,
    });

    return res.json(invoice);
  }
}
export { InvoiceController };

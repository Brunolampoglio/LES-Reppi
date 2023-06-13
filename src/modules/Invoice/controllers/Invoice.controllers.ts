import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateInvoiceService } from '../services/CreateInvoice.service';
import { IndexInvoiceService } from '../services/IndexInvoice.service';
import { ShowInvoiceService } from '../services/ShowInvoice.service';
import { UpdateInvoiceStatusService } from '../services/UpdateStatus.service';
import { IndexAllInvoiceService } from '../services/indexAllInvoice.service';
import { RequestExchangeService } from '../services/RequestExchange.service';
import { FindRequestExchangeService } from '../services/FindRequestExchange.service';
import { UpdateStatusExchangeService } from '../services/UpdateStatusExchange.service';
import { IndexAllInvoiceProductsService } from '../services/indexAllInvoiceProducts.service';

class InvoiceController {
  async create(req: Request, res: Response): Promise<Response> {
    const { address_id, cart_id, freight, card_ids, coupon_ids } = req.body;
    const user_id = req.user.id;

    const createInvoiceService = container.resolve(CreateInvoiceService);

    const invoice = await createInvoiceService.execute({
      address_id,
      cart_id,
      freight,
      user_id,
      card_ids,
      coupon_ids,
    });
    return res.status(201).json(invoice);
  }

  async requestExchange(req: Request, res: Response): Promise<Response> {
    const { product_id } = req.params;
    const { reason } = req.body;

    const requestExchangeService = container.resolve(RequestExchangeService);

    const invoice = await requestExchangeService.execute(product_id, reason);

    return res.json(invoice);
  }

  async requestExchangeStatus(req: Request, res: Response): Promise<Response> {
    const { product_id } = req.params;
    const { status } = req.body;

    const updateStatusExchangeService = container.resolve(
      UpdateStatusExchangeService,
    );

    const invoice = await updateStatusExchangeService.execute(
      product_id,
      status,
    );

    return res.json(invoice);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const indexInvoiceService = container.resolve(IndexInvoiceService);

    const invoice = await indexInvoiceService.execute({
      user_id,
    });

    return res.json(invoice);
  }

  async indexAll(req: Request, res: Response): Promise<Response> {
    const indexInvoiceService = container.resolve(IndexAllInvoiceService);

    const invoice = await indexInvoiceService.execute();

    return res.json(invoice);
  }

  async indexAllProducts(req: Request, res: Response): Promise<Response> {
    const indexInvoiceService = container.resolve(
      IndexAllInvoiceProductsService,
    );

    const invoice = await indexInvoiceService.execute({
      start_date: req.query.start_date as string,
      final_date: req.query.final_date as string,
      filter_by: req.query.filter_by as string,
      filter_value: req.query.filter_value as string,
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

  async showExchangeRequest(req: Request, res: Response): Promise<Response> {
    const showExchangeRequest = container.resolve(FindRequestExchangeService);

    const invoice = await showExchangeRequest.execute();

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

import { InvoiceProduct } from '../entities/InvoiceProduct';

interface IInvoiceProductRepository {
  findById(id: string): Promise<InvoiceProduct | undefined>;
  save(invoiceProduct: InvoiceProduct): Promise<InvoiceProduct>;
  delete(invoiceProduct: InvoiceProduct): Promise<void>;
  IndexAll(): Promise<InvoiceProduct[]>;
  FindExchangeRequest(): Promise<InvoiceProduct[]>;
}
export { IInvoiceProductRepository };

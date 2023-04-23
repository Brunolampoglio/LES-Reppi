import { InvoiceProduct } from '../entities/InvoiceProduct';

interface IInvoiceProductRepository {
  findById(id: string): Promise<InvoiceProduct | undefined>;
  save(invoiceProduct: InvoiceProduct): Promise<InvoiceProduct>;
  delete(invoiceProduct: InvoiceProduct): Promise<void>;
}
export { IInvoiceProductRepository };

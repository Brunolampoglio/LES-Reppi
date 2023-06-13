import { InvoiceProduct } from '../entities/InvoiceProduct';
import { IAllInvoicesRepositoryDTO } from './dto/AllInvoicesRepositoryDTO';

interface IInvoiceProductRepository {
  findById(id: string): Promise<InvoiceProduct | undefined>;
  save(invoiceProduct: InvoiceProduct): Promise<InvoiceProduct>;
  delete(invoiceProduct: InvoiceProduct): Promise<void>;
  IndexAll(params: IAllInvoicesRepositoryDTO): Promise<InvoiceProduct[]>;
  FindExchangeRequest(): Promise<InvoiceProduct[]>;
}
export { IInvoiceProductRepository };

import { Invoice } from '../entities/Invoice';
import { ICreateInvoiceRepositoryDTO } from './dto/CreateInvoiceRepositoryDTO';

interface IInvoiceRepository {
  create(invoice: ICreateInvoiceRepositoryDTO): Invoice;
  index(id: string): Promise<Invoice[]>;
  indexAll(): Promise<Invoice[]>;
  findById(id: string): Promise<Invoice | undefined>;
  save(invoice: Invoice): Promise<Invoice>;
  delete(invoice: Invoice): Promise<void>;
}

export { IInvoiceRepository };

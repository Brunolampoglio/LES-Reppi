import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { Invoices } from '../entities/Invoices';
import { IFindByDate, IInvoiceCreate } from './dto/InvoicesRepositoryDTO';

interface IInvoicesRepository {
  findBy(filter: Partial<Invoices>): Promise<Invoices | undefined>;
  listBy(
    filter: IPaginatedRequest<Invoices>,
  ): Promise<IPaginatedResponse<Invoices>>;
  findByDate(date: IFindByDate): Promise<Invoices[]>;
  create(invoices: IInvoiceCreate): Invoices;
  save(invoices: Invoices): Promise<Invoices>;
  remove(invoices: Invoices): Promise<void>;
}

export { IInvoicesRepository };

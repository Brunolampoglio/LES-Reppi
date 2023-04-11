import { inject, injectable } from 'tsyringe';
import { Invoice } from '../entities/Invoice';
import { IInvoiceRepository } from '../repositories/InvoiceRepository.interface';

@injectable()
class IndexAllInvoiceService {
  constructor(
    @inject('InvoiceRepository')
    private invoicesRepository: IInvoiceRepository,
  ) {}

  public async execute(): Promise<Invoice[]> {
    const invoices = await this.invoicesRepository.indexAll();

    console.log(invoices);

    return invoices;
  }
}
export { IndexAllInvoiceService };

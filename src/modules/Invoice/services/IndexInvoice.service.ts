import { inject, injectable } from 'tsyringe';
import { Invoice } from '../entities/Invoice';
import { IInvoiceRepository } from '../repositories/InvoiceRepository.interface';
import { IIndexInvoiceDTO } from './dto/IndexInvoiceDTO';

@injectable()
class IndexInvoiceService {
  constructor(
    @inject('InvoiceRepository')
    private invoicesRepository: IInvoiceRepository,
  ) { }

  public async execute({ user_id }: IIndexInvoiceDTO): Promise<Invoice[]> {
    const invoices = await this.invoicesRepository.index(user_id);

    return invoices;
  }
}
export { IndexInvoiceService };

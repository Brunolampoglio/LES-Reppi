import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { Invoice } from '../entities/Invoice';
import { IInvoiceRepository } from '../repositories/InvoiceRepository.interface';
import { IShowInvoiceDTO } from './dto/IndexInvoiceDTO';

@injectable()
class ShowInvoiceService {
  constructor(
    @inject('InvoiceRepository')
    private invoicesRepository: IInvoiceRepository,
  ) { }

  public async execute({ invoice_id }: IShowInvoiceDTO): Promise<Invoice> {
    const invoice = await this.invoicesRepository.findById(invoice_id);

    if (!invoice) {
      throw new AppError('Pedido não encontrado!', 404);
    }

    return invoice;
  }
}

export { ShowInvoiceService };

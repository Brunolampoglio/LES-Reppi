import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { Invoice } from '../entities/Invoice';
import { IInvoiceRepository } from '../repositories/InvoiceRepository.interface';
import { IUpdateStatusInvoiceDTO } from './dto/UpdateStatusDTO';

@injectable()
class UpdateInvoiceStatusService {
  constructor(
    @inject('InvoicesRepository')
    private invoicesRepository: IInvoiceRepository,
  ) {}

  public async execute({
    invoice_id,
    status,
  }: IUpdateStatusInvoiceDTO): Promise<Invoice> {
    const invoice = await this.invoicesRepository.findById(invoice_id);

    if (!invoice) {
      throw new AppError('Pedido não encontrado!', 404);
    }

    invoice.status = status;

    await this.invoicesRepository.save(invoice);

    return invoice;
  }
}
export { UpdateInvoiceStatusService };

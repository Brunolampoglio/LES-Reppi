import { inject, injectable } from 'tsyringe';
import { InvoiceProduct } from '../entities/InvoiceProduct';
import { IInvoiceProductRepository } from '../repositories/InvoiceProductRepository.interface';

@injectable()
class IndexAllInvoiceProductsService {
  constructor(
    @inject('InvoiceProductRepository')
    private invoiceProductRepository: IInvoiceProductRepository,
  ) {}

  public async execute(): Promise<InvoiceProduct[]> {
    const invoices = await this.invoiceProductRepository.IndexAll();

    return invoices;
  }
}
export { IndexAllInvoiceProductsService };

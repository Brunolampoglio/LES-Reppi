import { inject, injectable } from 'tsyringe';
import { InvoiceProduct } from '../entities/InvoiceProduct';
import { IInvoiceProductRepository } from '../repositories/InvoiceProductRepository.interface';
import { IAllInvoicesDTO } from './dto/AllInvoicesDTO';

@injectable()
class IndexAllInvoiceProductsService {
  constructor(
    @inject('InvoiceProductRepository')
    private invoiceProductRepository: IInvoiceProductRepository,
  ) { }

  public async execute({
    start_date,
    final_date,
    filter_by,
    filter_value,
  }: IAllInvoicesDTO): Promise<InvoiceProduct[]> {
    const invoices = await this.invoiceProductRepository.IndexAll({
      start_date,
      final_date,
      filter_by,
      filter_value,
    });

    return invoices;
  }
}
export { IndexAllInvoiceProductsService };

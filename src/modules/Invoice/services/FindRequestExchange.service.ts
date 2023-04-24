import { inject, injectable } from 'tsyringe';
import { InvoiceProduct } from '../entities/InvoiceProduct';
import { IInvoiceProductRepository } from '../repositories/InvoiceProductRepository.interface';

@injectable()
class FindRequestExchangeService {
  constructor(
    @inject('InvoiceProductRepository')
    private invoiceProductRepository: IInvoiceProductRepository,
  ) {}

  public async execute(): Promise<InvoiceProduct[]> {
    const invoiceProducts =
      await this.invoiceProductRepository.FindExchangeRequest();

    return invoiceProducts;
  }
}
export { FindRequestExchangeService };

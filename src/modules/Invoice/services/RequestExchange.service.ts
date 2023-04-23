import { AppError } from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import { InvoiceProduct } from '../entities/InvoiceProduct';
import { IInvoiceProductRepository } from '../repositories/InvoiceProductRepository.interface';

@injectable()
class RequestExchangeService {
  constructor(
    @inject('InvoiceProductRepository')
    private invoiceProductRepository: IInvoiceProductRepository,
  ) { }

  public async execute(
    product_id: string,
    reason: string,
  ): Promise<InvoiceProduct> {
    const invoiceProduct = await this.invoiceProductRepository.findById(
      product_id,
    );

    if (!invoiceProduct) {
      throw new AppError('Produto não encontrado!', 404);
    }

    invoiceProduct.exchange_status = 'Troca solicitada';
    invoiceProduct.exchange_reason = reason;

    const newInvoiceProduct = await this.invoiceProductRepository.save(
      invoiceProduct,
    );

    return newInvoiceProduct;
  }
}
export { RequestExchangeService };

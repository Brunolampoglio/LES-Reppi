import { Repository, getRepository } from 'typeorm';
import { InvoiceProduct } from '../entities/InvoiceProduct';
import { IInvoiceProductRepository } from './InvoiceProductRepository.interface';

class InvoiceProductRepository implements IInvoiceProductRepository {
  private ormRepository: Repository<InvoiceProduct>;

  constructor() {
    this.ormRepository = getRepository(InvoiceProduct);
  }

  findById(id: string): Promise<InvoiceProduct | undefined> {
    const invoiceProduct = this.ormRepository.findOne({
      where: { id },
    });

    return invoiceProduct;
  }

  async save(invoiceProduct: InvoiceProduct): Promise<InvoiceProduct> {
    const newInvoiceProduct = await this.ormRepository.save(invoiceProduct);

    return newInvoiceProduct;
  }

  async delete(invoiceProduct: InvoiceProduct): Promise<void> {
    await this.ormRepository.delete(invoiceProduct.id);
  }
}
export { InvoiceProductRepository };

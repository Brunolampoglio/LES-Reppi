import { Repository, getRepository } from 'typeorm';
import { InvoiceProduct } from '../entities/InvoiceProduct';
import { IInvoiceProductRepository } from './InvoiceProductRepository.interface';
import { IAllInvoicesRepositoryDTO } from './dto/AllInvoicesRepositoryDTO';

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

  FindExchangeRequest(): Promise<InvoiceProduct[]> {
    const products = this.ormRepository
      .createQueryBuilder('invoiceProducts')
      .leftJoinAndSelect('invoiceProducts.products', 'invoice')
      .leftJoinAndSelect('invoice.user', 'user')
      .where(
        'invoiceProducts.exchange_status = :status OR invoiceProducts.exchange_status = :status2 OR invoiceProducts.exchange_status = :status3 OR invoiceProducts.exchange_status = :status4 OR invoiceProducts.exchange_status = :status5',
        {
          status5: 'Troca Solicitada',
          status: 'Troca Aprovada',
          status2: 'Troca não Aprovada',
          status3: 'Produto Recebido',
          status4: 'Troca Finalizada',
        },
      )
      .getMany();

    return products;
  }

  async IndexAll({
    start_date,
    final_date,
    filter_by,
    filter_value,
  }: IAllInvoicesRepositoryDTO): Promise<InvoiceProduct[]> {
    const query = this.ormRepository.createQueryBuilder('invoiceProducts');
    if (final_date && start_date) {
      query.andWhere(
        'invoiceProducts.created_at BETWEEN :start_date AND :final_date',
        {
          start_date,
          final_date,
        },
      );
    }

    if (filter_by && filter_value) {
      query.andWhere(`invoiceProducts.${filter_by} = :filter_value`, {
        filter_value,
      });
    }

    const products = await query.getMany();

    return products;
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

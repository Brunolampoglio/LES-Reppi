import { Repository, getRepository } from 'typeorm';
import { Invoice } from '../entities/Invoice';
import { ICreateInvoiceRepositoryDTO } from './dto/CreateInvoiceRepositoryDTO';
import { IInvoiceRepository } from './InvoiceRepository.interface';

class InvoiceRepository implements IInvoiceRepository {
  private ormRepository: Repository<Invoice>;

  constructor() {
    this.ormRepository = getRepository(Invoice);
  }

  create({
    address_id,
    cart_id,
    discount,
    freight,
    order_number,
    status,
    total,
    user_id,
  }: ICreateInvoiceRepositoryDTO): Invoice {
    const invoice = this.ormRepository.create({
      address_id,
      cart_id,
      discount,
      freight,
      order_number,
      status,
      total,
      user_id,
    });

    return invoice;
  }

  index(id: string): Promise<Invoice[]> {
    return this.ormRepository.find({
      where: { user_id: id },
    });
  }

  async save(invoice: Invoice): Promise<Invoice> {
    const newInvoice = await this.ormRepository.save(invoice);

    return newInvoice;
  }

  public async findById(id: string): Promise<Invoice | undefined> {
    const invoice = await this.ormRepository.findOne({
      where: { id },
    });

    return invoice;
  }

  async delete(invoice: Invoice): Promise<void> {
    await this.ormRepository.delete(invoice.id);
  }
}

export { InvoiceRepository };
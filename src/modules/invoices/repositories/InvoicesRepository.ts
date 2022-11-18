import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { Repository, getRepository, Between } from 'typeorm';
import { startOfDay, endOfDay } from 'date-fns';
import { Invoices } from '../entities/Invoices';
import { IFindByDate, IInvoiceCreate } from './dto/InvoicesRepositoryDTO';
import { IInvoicesRepository } from './InvoicesRepositories.interface';

class InvoiceRepository implements IInvoicesRepository {
  private ormRepository: Repository<Invoices>;

  constructor() {
    this.ormRepository = getRepository(Invoices);
  }

  async findBy(filter: Partial<Invoices>): Promise<Invoices | undefined> {
    const invoice = await this.ormRepository.findOne(filter);

    return invoice;
  }

  async findByDate({ startDate, endDate }: IFindByDate): Promise<Invoices[]> {
    const invoices = await this.ormRepository.find({
      where: {
        created_at: Between(startOfDay(startDate), endOfDay(endDate)),
      },
    });

    return invoices;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<Invoices>): Promise<IPaginatedResponse<Invoices>> {
    const invoices = await this.ormRepository.find({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    const invoiceTotal = await this.ormRepository.count(filters);

    return {
      results: invoices,
      total: invoiceTotal,
      page,
      limit,
    };
  }

  create({ desc, plan_id, user_id }: IInvoiceCreate): Invoices {
    const invoices = this.ormRepository.create({
      desc,
      plan_id,
      user_id,
    });

    return invoices;
  }

  async save(invoices: Invoices): Promise<Invoices> {
    const newInvoices = await this.ormRepository.save(invoices);

    return newInvoices;
  }

  async remove(invoices: Invoices): Promise<void> {
    await this.ormRepository.remove(invoices);
  }
}

export { InvoiceRepository };

import { injectable, inject } from 'tsyringe';
import { ICartRepository } from '@modules/Cart/repositories/CartRepository.interface';
import { AppError } from '@shared/error/AppError';
import { ICreateInvoiceDTO } from './dto/CreateInvoiceDTO';
import { Invoice } from '../entities/Invoice';
import { IInvoiceRepository } from '../repositories/InvoiceRepository.interface';

@injectable()
class CreateInvoiceService {
  constructor(
    @inject('InvoiceRepository')
    private invoicesRepository: IInvoiceRepository,

    @inject('CartRepository')
    private cartRepository: ICartRepository,
  ) { }

  public async execute({
    address_id,
    cart_id,
    discount,
    freight,
    user_id,
  }: ICreateInvoiceDTO): Promise<Invoice> {
    const cart = await this.cartRepository.findById(cart_id);

    if (!cart) {
      throw new AppError('Carrinho não encontrado!', 404);
    }

    const token = Math.floor(Math.random() * 9000 + 1000);

    const invoice = this.invoicesRepository.create({
      address_id,
      cart_id,
      discount,
      freight,
      order_number: token.toString(),
      status: 'Em análise',
      total: cart.total,
      user_id,
    });

    await this.invoicesRepository.save(invoice);

    return invoice;
  }
}
export { CreateInvoiceService };

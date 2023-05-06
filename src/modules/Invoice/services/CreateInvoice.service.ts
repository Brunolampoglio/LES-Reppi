import { injectable, inject } from 'tsyringe';
import { ICartRepository } from '@modules/Cart/repositories/CartRepository.interface';
import { AppError } from '@shared/error/AppError';
import { ICardRepository } from '@modules/Cards/repositories/CardRepositories.interface';
import { ICouponRepository } from '@modules/Coupon/repositories/CouponRepository.interface';
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

    @inject('CardRepository')
    private cardRepository: ICardRepository,

    @inject('CouponRepository')
    private couponRepository: ICouponRepository,
  ) { }

  public async execute({
    address_id,
    cart_id,
    coupon_ids,
    freight,
    user_id,
    card_ids,
  }: ICreateInvoiceDTO): Promise<Invoice> {
    const cart = await this.cartRepository.findById(cart_id);

    if (!cart) {
      throw new AppError('Carrinho não encontrado!', 404);
    }

    const cupom = await this.couponRepository.findByIds(coupon_ids);

    if (card_ids.length > 1) {
      card_ids.forEach(card => {
        if (card.value < 10) {
          throw new AppError(
            'Valor mínimo de compra é R$10,00 em cada cartão',
            400,
          );
        }
      });
      const cardsTotalValue = card_ids.reduce((total, card) => {
        return total + card.value;
      }, 0);
      if (cardsTotalValue !== cart.total + freight) {
        throw new AppError(
          'Valor total dos cartões deve ser igual ao valor total do carrinho',
          400,
        );
      }
    }

    const cards = await this.cardRepository.findByIds(
      card_ids.map(card => card.card_id),
    );

    const totalProducts = cart.products.reduce((total, product) => {
      return total + product.value * product.quantity;
    }, 0);

    const token = Math.floor(Math.random() * 9000 + 1000);

    let discountCoupons = 0;

    const invoice = this.invoicesRepository.create({
      address_id,
      discount: discountCoupons,
      freight,
      order_number: token.toString(),
      status: 'Em análise',
      total: totalProducts + freight,
      user_id,
    });

    const invoiceWithId = await this.invoicesRepository.save(invoice);

    const cupomFormat = cupom.map(coupon => {
      const couponFormatted = {
        name: coupon.name,
        description: coupon.description,
        value: coupon.value,
        active: coupon.active,
        quantity: coupon.quantity,
      };

      discountCoupons += couponFormatted.value;
      invoice.discount = discountCoupons;

      return {
        ...couponFormatted,
        invoice_id: invoiceWithId.id,
      };
    });

    const productsFormat = cart.products.map(product => {
      const productFormatted = {
        title: product.title,
        author: product.author,
        value: product.value,
        quantity: 1,
        image_url: product.image_url,
        exchange_status: 'Em processamento',
        product_id: product.product_id,
      };

      return {
        ...productFormatted,
        invoice_id: invoiceWithId.id,
      };
    });

    const cardsFormat = cards.map(card => {
      const cardFormatted = {
        last_digits: card.last_digits,
        first_digits: card.first_digits,
        brand: card.brand,
        holder_name: card.holder_name,
        expiration_month: card.expiration_month,
        expiration_year: card.expiration_year,
      };

      return {
        ...cardFormatted,
        invoice_id: invoiceWithId.id,
      };
    });

    invoice.cards = cardsFormat;
    invoice.coupons = cupomFormat;
    invoice.products = productsFormat;

    invoice.total -= invoice.discount;

    await this.invoicesRepository.save(invoice);

    await this.cartRepository.delete(cart_id);

    return invoice;
  }
}
export { CreateInvoiceService };

import { injectable, inject } from 'tsyringe';
import { ICartRepository } from '@modules/Cart/repositories/CartRepository.interface';
import { AppError } from '@shared/error/AppError';
import { ICardRepository } from '@modules/Cards/repositories/CardRepositories.interface';
import { ICouponRepository } from '@modules/Coupon/repositories/CouponRepository.interface';
import { ICreateInvoiceDTO } from './dto/CreateInvoiceDTO';
import { Invoice } from '../entities/Invoice';
import { IInvoiceRepository } from '../repositories/InvoiceRepository.interface';
import { InvoiceProduct } from '../entities/InvoiceProduct';
import { Cards } from '../entities/CardsInvoice';
import { DiscountCoupons } from '../entities/DiscountCoupons';

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

    const totalProducts = cart.products.reduce((total, product) => {
      return total + product.value * product.quantity;
    }, 0);

    const productInstance = new InvoiceProduct();
    const cardsProductsInstance = new Cards();
    const couponsInstance = new DiscountCoupons();
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

    // const invoiceWithId = await this.invoicesRepository.save(invoice);

    coupon_ids.forEach(async coupon => {
      const couponDisc = await this.couponRepository.findById(coupon);

      if (!couponDisc) {
        throw new AppError('Cupom não encontrado!', 404);
      }

      discountCoupons += couponDisc.value;

      const couponFormatted = {
        name: couponDisc.name,
        description: couponDisc.description,
        value: couponDisc.value,
      };

      Object.assign(couponsInstance, {
        ...couponFormatted,
        invoice_id: invoice.id,
      });

      invoice.coupons = [couponsInstance];
    });

    cart.products.forEach(product => {
      const productFormatted = {
        title: product.title,
        author: product.author,
        value: product.value,
        quantity: 1,
        image_url: product.image_url,
        exchange_status: 'Em processamento',
        product_id: product.product_id,
      };

      Object.assign(productInstance, {
        ...productFormatted,
        invoice_id: invoice.id,
      });

      invoice.products = [productInstance];
    });

    card_ids.forEach(async card => {
      const cardFormatted = await this.cardRepository.show(card);

      if (!cardFormatted) {
        throw new AppError('Cartão não encontrado!', 404);
      }

      const cardProduct = {
        last_digits: cardFormatted.last_digits,
        first_digits: cardFormatted.first_digits,
        brand: cardFormatted.brand,
        holder_name: cardFormatted.holder_name,
        expiration_month: cardFormatted.expiration_month,
        expiration_year: cardFormatted.expiration_year,
      };

      Object.assign(cardsProductsInstance, {
        ...cardProduct,
        invoice_id: invoice.id,
      });

      invoice.cards = [cardsProductsInstance];
    });

    invoice.discount = discountCoupons;

    invoice.total = totalProducts + freight - discountCoupons;

    await this.invoicesRepository.save(invoice);

    await this.cartRepository.delete(cart_id);

    return invoice;
  }
}
export { CreateInvoiceService };

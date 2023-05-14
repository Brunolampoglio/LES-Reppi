import { injectable, inject } from 'tsyringe';
import { ICartRepository } from '@modules/Cart/repositories/CartRepository.interface';
import { AppError } from '@shared/error/AppError';
import { ICardRepository } from '@modules/Cards/repositories/CardRepositories.interface';
import { ICouponRepository } from '@modules/Coupon/repositories/CouponRepository.interface';
import { IProductRepository } from '@modules/Product/repositories/ProductRepository.interface';
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

    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) { }

  public async execute({
    address_id,
    cart_id,
    coupon_ids,
    freight,
    user_id,
    card_ids,
  }: ICreateInvoiceDTO): Promise<Invoice> {
    const [cart, cupom, cards] = await Promise.all([
      this.cartRepository.findById(cart_id),
      this.couponRepository.findByIds(coupon_ids),
      this.cardRepository.findByIds(card_ids.map(card => card.card_id)),
    ]);
    if (!cart) {
      throw new AppError('Carrinho não encontrado!', 404);
    }
    const products = await this.productRepository.findByIds(
      cart.products.map(product => product.product_id),
    );

    products.forEach(product => {
      const productInCart = cart.products.find(
        item => item.product_id === product.id,
      );
      if (productInCart) {
        if (productInCart.quantity > product.stock_units) {
          throw new AppError(
            `Quantidade de ${product.title} indisponível no estoque`,
            400,
          );
        }
      }
    });

    products.forEach(async product => {
      const productInCart = cart.products.find(
        item => item.product_id === product.id,
      );
      if (productInCart) {
        product.stock_units -= productInCart.quantity;
        await this.productRepository.save(product);
      }
    });

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

    const itens: {
      title: string;
      author: string;
      value: number;
      quantity: number;
      image_url: string;
      exchange_status: string;
      product_id: string;
      invoice_id: string;
    }[] = [];

    cart.products.forEach(product => {
      if (product.quantity > 1) {
        for (let i = 0; i < product.quantity; i++) {
          // ignora o erro pois de colocar i + 1, estoura memoria do node
          itens.push({
            title: product.title,
            author: product.author,
            value: product.value,
            quantity: 1,
            image_url: product.image_url,
            exchange_status: 'Em processamento',
            product_id: product.product_id,
            invoice_id: invoiceWithId.id,
          });
        }
      } else {
        itens.push({
          title: product.title,
          author: product.author,
          value: product.value,
          quantity: 1,
          image_url: product.image_url,
          exchange_status: 'Em processamento',
          product_id: product.product_id,
          invoice_id: invoiceWithId.id,
        });
      }
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
    invoice.products = itens;

    invoice.total -= invoice.discount;

    await this.invoicesRepository.save(invoice);

    await this.cartRepository.delete(cart_id);

    return invoice;
  }
}
export { CreateInvoiceService };

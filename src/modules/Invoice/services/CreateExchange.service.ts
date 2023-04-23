import { ICouponRepository } from '@modules/Coupon/repositories/CouponRepository.interface';
import { IProductRepository } from '@modules/Product/repositories/ProductRepository.interface';
import { AppError } from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import { InvoiceProduct } from '../entities/InvoiceProduct';
import { IInvoiceProductRepository } from '../repositories/InvoiceProductRepository.interface';
import { ICreateInvoiceProductDTO } from './dto/UpdateStatusDTO';

@injectable()
class CreateExchangeService {
  constructor(
    @inject('InvoiceRepository')
    private invoicesRepository: IInvoiceProductRepository,

    @inject('CouponRepository')
    private couponRepository: ICouponRepository,

    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    InvoiceProduct_id,
    status,
  }: ICreateInvoiceProductDTO): Promise<InvoiceProduct> {
    const invoiceProduct = await this.invoicesRepository.findById(
      InvoiceProduct_id,
    );

    if (!invoiceProduct) {
      throw new AppError('Produto não encontrado!', 404);
    }

    const token = Math.floor(Math.random() * 9000 + 1000);

    if (status === 'TROCA APROVADA ') {
      const coupon = this.couponRepository.create({
        name: `TRO-${token} - ${invoiceProduct.value}`,
        description: `TROCA ${token}`,
        value: invoiceProduct.value,
        active: true,
        quantity: 1,
      });

      const product = await this.productRepository.findById(
        invoiceProduct.product_id,
      );

      if (!product) {
        throw new AppError('Produto não encontrado!', 404);
      }

      product.stock_units += 1;

      await this.productRepository.save(product);

      await this.couponRepository.save(coupon);
    }

    invoiceProduct.exchange_status = status;

    const newInvoiceProduct = await this.invoicesRepository.save(
      invoiceProduct,
    );

    return newInvoiceProduct;
  }
}
export { CreateExchangeService };

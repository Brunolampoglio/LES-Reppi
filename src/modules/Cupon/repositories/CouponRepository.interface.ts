import { Coupon } from '../entities/Coupon';
import { ICreateCuponDTO } from './dto/CouponRepositoryDTO';

export interface ICouponRepository {
  index(): Promise<Coupon[]>;
  findByName(name: string): Promise<Coupon | undefined>;
  findById(id: string): Promise<Coupon | undefined>;
  create(coupon: ICreateCuponDTO): Coupon;
  save(coupon: Coupon): Promise<Coupon>;
  remove(coupon: Coupon): Promise<void>;
}

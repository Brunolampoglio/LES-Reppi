import { Coupon } from '../entities/Coupon';
import { ICreateCouponDTO } from './dto/CouponRepositoryDTO';

export interface ICouponRepository {
  index(): Promise<Coupon[]>;
  findByName(name: string): Promise<Coupon | undefined>;
  findById(id: string): Promise<Coupon | undefined>;
  findByIds(ids: string[]): Promise<Coupon[]>;
  create(coupon: ICreateCouponDTO): Coupon;
  save(coupon: Coupon): Promise<Coupon>;
  remove(coupon: Coupon): Promise<void>;
}

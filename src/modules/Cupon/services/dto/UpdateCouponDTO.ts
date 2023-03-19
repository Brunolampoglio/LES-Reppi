export interface IUpdateCouponDTO {
  coupon_id: string;
  name: string;
  description: string;
  value: number;
  active: boolean;
}

export interface IUpdateStatusCouponDTO {
  coupon_id: string;
  active: boolean;
}

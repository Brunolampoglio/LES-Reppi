export interface IUpdateCartDTO {
  cart_id: string;
  product_id: string;
  is_subtract?: boolean;
}

export interface IUpdateStatusCartDTO {
  cart_id: string;
  active: boolean;
}

export interface IUpdateCartDTO {
  cart_id: string;
  product_id: string;
  is_subtract?: boolean;
}

export interface IRemoveItemCartDTO {
  cart_id: string;
  product_id: string;
}

export interface IUpdateStatusCartDTO {
  cart_id: string;
  active: boolean;
}

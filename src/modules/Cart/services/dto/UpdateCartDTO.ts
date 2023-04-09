export interface IUpdateCartDTO {
  cart_id: string;
  product_id: string;
  is_subtract?: boolean;
}

export interface IRemoveItemCartDTO {
  cart_id: string;
  product_id: string;
}

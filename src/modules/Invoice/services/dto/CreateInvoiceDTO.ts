export interface ICreateInvoiceDTO {
  address_id: string;
  cart_id: string;
  freight: number;
  user_id: string;
  card_ids: string[];
  coupon_ids: string[];
}

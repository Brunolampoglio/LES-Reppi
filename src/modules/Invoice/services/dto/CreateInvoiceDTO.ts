export interface ICreateInvoiceDTO {
  address_id: string;
  cart_id: string;
  freight: number;
  user_id: string;
  card_ids: {
    card_id: string;
    value: number;
  }[];
  coupon_ids: string[];
}

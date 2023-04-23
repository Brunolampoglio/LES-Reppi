export interface ICreateInvoiceDTO {
  address_id: string;
  cart_id: string;
  discount_coupons: string[];
  freight: number;
  user_id: string;
  cards: string[];
}

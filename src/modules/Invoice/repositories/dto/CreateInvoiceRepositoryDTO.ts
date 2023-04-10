export interface ICreateInvoiceRepositoryDTO {
  user_id: string;
  cart_id: string;
  order_number: string;
  discount: number;
  status: string;
  freight: number;
  total: number;
  address_id: string;
}

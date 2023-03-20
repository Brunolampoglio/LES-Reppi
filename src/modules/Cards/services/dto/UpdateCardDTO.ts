export interface IUpdateCardDTO {
  id: string;
  main: boolean;
  user_id: string;
  first_digits?: string;
  last_digits?: string;
  brand?: string;
  holder_name?: string;
  expiration_month?: number;
  expiration_year?: number;
}

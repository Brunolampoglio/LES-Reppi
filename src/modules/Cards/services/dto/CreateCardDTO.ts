interface ICreateCardDTO {
  external_id: string;
  first_digits: string;
  last_digits: string;
  brand: string;
  holder_name: string;
  expiration_month: number;
  expiration_year: number;
  main: boolean;
  user_id: string;
}

export { ICreateCardDTO };

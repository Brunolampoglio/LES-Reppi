interface ICreateCardDTO {
  external_id: string;
  digits: string;
  holder_name: string;
  expiration: string;
  main: boolean;
  user_id: string;
}

export { ICreateCardDTO };

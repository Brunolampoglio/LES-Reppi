interface ICreateCardDTO {
  digits: string;
  holder_name: string;
  expiration: string;
  main: boolean;
  user_id: string;
}

export { ICreateCardDTO };

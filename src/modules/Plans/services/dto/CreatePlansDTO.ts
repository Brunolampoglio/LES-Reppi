interface ICreatePlansDTO {
  name: string;
  description: string;
  price: number;
  recurrence: string;
  qtd_access: number;
  user_id: string;
  isMaster: boolean;
}

export { ICreatePlansDTO };

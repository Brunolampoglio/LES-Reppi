interface IUpdatePlanDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  recurrence: string;
  qtd_access: number;
  isMaster: boolean;
}
export { IUpdatePlanDTO };

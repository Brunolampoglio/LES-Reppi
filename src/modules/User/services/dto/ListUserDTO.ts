import { User } from "@modules/User/entities/User";

interface IListUserDTO {
  page: number;
  limit: number;
  isMaster: boolean;
  gestor_id?: string;
}
export { IListUserDTO };

import { IPaginatedRequest } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { SolicitationRedeem } from "../entities/SolicitationRedeem";

interface ISolicitationRepository{
  findBy(filter: Partial<SolicitationRedeem>): Promise<SolicitationRedeem | undefined>;
  listBy(filter: IPaginatedRequest<SolicitationRedeem>): Promise<IPaginatedResponse<SolicitationRedeem>>;
  Show(id: string): Promise<SolicitationRedeem | undefined>;
  create(solicitation: ISolicitationCreate): SolicitationRedeem;
  save(solicitation: SolicitationRedeem): Promise<SolicitationRedeem>;
  remove(solicitation: SolicitationRedeem): Promise<void>;

}
export { ISolicitationRepository };

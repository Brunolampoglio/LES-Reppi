import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { inject, injectable } from "tsyringe";
import { SolicitationRedeem } from "../entities/SolicitationRedeem";
import { ISolicitationRepository } from "../repositories/SolicitationRepositories.interface";

@injectable()
class ListAllSolicitationService {
  constructor(
    @inject("SolicitationRepository")
    private solicitationRepository: ISolicitationRepository
  ) {}

  public async execute({
    gestor_id
  }: IListAllSolicitationDTO): Promise<IPaginatedResponse<SolicitationRedeem>> {
    const solicitation = await this.solicitationRepository.listByGestor(gestor_id);

    return {
      results: solicitation.results,
      limit: solicitation.limit,
      page: solicitation.page,
      total: solicitation.total,
    };
  }
}

export { ListAllSolicitationService };

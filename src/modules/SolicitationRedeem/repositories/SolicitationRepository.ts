import { IPaginatedRequest } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { Repository, getRepository } from "typeorm";
import { SolicitationRedeem } from "../entities/SolicitationRedeem";
import { ISolicitationRepository } from "./SolicitationRepositories.interface";

class SolicitationRepository implements ISolicitationRepository {
  private ormRepository: Repository<SolicitationRedeem>;

  constructor() {
    this.ormRepository = getRepository(SolicitationRedeem);
  }

  async findBy(filter: Partial<SolicitationRedeem>): Promise<SolicitationRedeem | undefined> {
    const solicitation = await this.ormRepository.findOne(filter);

    return solicitation;
  }

  async Show(id: string): Promise<SolicitationRedeem | undefined> {
    const solicitation = await this.ormRepository.findOne(id);

    return solicitation;

  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<SolicitationRedeem>): Promise<IPaginatedResponse<SolicitationRedeem>> {
    const [solicitations, solicitationTotal] = await this.ormRepository.findAndCount({
      where: filters,
      relations: ["awards"],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      results: solicitations,
      total: solicitationTotal,
      page,
      limit,
    };
  }


  public async listByGestor(gestor_id: string): Promise<IPaginatedResponse<SolicitationRedeem>> {
    const [solicitations, solicitationsTotal] = await this.ormRepository.createQueryBuilder('solicitation')
      .leftJoinAndSelect('solicitation.awards', 'awards')
      .where('awards.client_id = :client_id', { client_id: gestor_id }).take().getManyAndCount();

    return {
      results: solicitations,
      total: solicitationsTotal,
      page: 1,
      limit: 10,
    };

  }

  create({
    patient_id,
    awards_id,
  }: ISolicitationCreate): SolicitationRedeem {
    const solicitation = this.ormRepository.create({
      patient_id,
      awards_id,
    });

    return solicitation;
  }

  async save(solicitation: SolicitationRedeem): Promise<SolicitationRedeem> {
    const newSolicitation = await this.ormRepository.save(solicitation);

    return newSolicitation;

  }

  async remove(solicitation: SolicitationRedeem): Promise<void> {
    await this.ormRepository.remove(solicitation);
  }

}

export { SolicitationRepository };

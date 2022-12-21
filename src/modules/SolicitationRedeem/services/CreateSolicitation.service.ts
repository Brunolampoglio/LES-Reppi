import { inject, injectable } from "tsyringe";
import { SolicitationRedeem } from "../entities/SolicitationRedeem";
import { ISolicitationRepository } from "../repositories/SolicitationRepositories.interface";

@injectable()
class CreateSolicitationService {
  constructor(
    @inject("SolicitationRepository")
    private solicitationRepository: ISolicitationRepository,
  ){}

  public async execute({
    patient_id,
    awards_id,
  }: ICreateSolicitationDTO): Promise<SolicitationRedeem> {
    const solicitation = this.solicitationRepository.create({
      patient_id,
      awards_id,
    });

    await this.solicitationRepository.save(solicitation);

    return solicitation;
  }


}

export { CreateSolicitationService };

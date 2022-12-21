import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { SolicitationRedeem } from "../entities/SolicitationRedeem";
import { ISolicitationRepository } from "../repositories/SolicitationRepositories.interface";
import { IUpdateSolicitationDTO } from "./dto/UpdateSolicitationDTO";

@injectable()
class UpdateSolicitationService {
  constructor(
    @inject("SolicitationRepository")
    private solicitationRepository: ISolicitationRepository,
  ) {}

  public async execute({ solicitation_id}: IUpdateSolicitationDTO): Promise<SolicitationRedeem> {
    const solicitation = await this.solicitationRepository.findBy({id: solicitation_id});

    if (!solicitation) throw new AppError("Solicitação não encontrada", 404);

    Object.assign(solicitation, {
      status: "Aceito",
    });

    const newSolicitation = await this.solicitationRepository.save(solicitation);

    return newSolicitation;
 }
}

export { UpdateSolicitationService };

import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { ISolicitationRepository } from "../repositories/SolicitationRepositories.interface";

@injectable()
class DeleteSolicitationService {
  constructor(
    @inject("SolicitationRepository")
    private solicitationRepository: ISolicitationRepository
  ) {}

  public async execute({
    solicitation_id,
  }: IDeleteSolicitationDTO): Promise<void> {
    const solicitation = await this.solicitationRepository.findBy({
      id: solicitation_id,
    });

    if (!solicitation) throw new AppError("Solicitação não encontrada", 404);

    await this.solicitationRepository.remove(solicitation);
  }
}
export { DeleteSolicitationService };

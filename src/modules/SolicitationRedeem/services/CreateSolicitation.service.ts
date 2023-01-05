import { IAwardsRepository } from "@modules/Awards/repositories/AwardsRepositories.interface";
import { IMyPointsRepository } from "@modules/myPoints/repositories/MyPointsRepositories.interface";
import { IUserRepository } from "@modules/User/repositories/UserRepository.interface";
import { AppError } from "@shared/error/AppError";
import { inject, injectable } from "tsyringe";
import { SolicitationRedeem } from "../entities/SolicitationRedeem";
import { ISolicitationRepository } from "../repositories/SolicitationRepositories.interface";

@injectable()
class CreateSolicitationService {
  constructor(
    @inject("SolicitationRepository")
    private solicitationRepository: ISolicitationRepository,

    @inject("MyPointsRepository")
    private myPointsRepository: IMyPointsRepository,

    @inject("AwardsRepository")
    private awardsRepository: IAwardsRepository,

  ){}

  public async execute({
    patient_id,
    awards_id,
  }: ICreateSolicitationDTO): Promise<SolicitationRedeem> {

    const awards = await this.awardsRepository.findBy({id: awards_id});

    const points = await this.myPointsRepository.findBy({user_id: patient_id});


    if(!awards){
      throw new AppError("Prêmio não encontrado");
    }

    if(!points){
      throw new AppError("Pontos não encontrados");
    }

    if(points.points < awards.points){
      throw new AppError("Você não tem pontos suficientes para resgatar esse prêmio");
    }


    const solicitation = this.solicitationRepository.create({
      patient_id,
      awards_id,
    });

    await this.solicitationRepository.save(solicitation);

    return solicitation;
  }


}

export { CreateSolicitationService };

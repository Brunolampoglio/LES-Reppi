import { IPaginatedRequest } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { Repository, getRepository } from "typeorm";
import { PatientMenu } from "../entities/PatientMenu";
import { IPatientMenuCreate } from "./dto/PatienteMenuDTO";
import { IPatientMenuRepository } from "./PatienteMenuRepositories.interface";

class PatientMenuRepository implements IPatientMenuRepository {
  private ormRepository: Repository<PatientMenu>;

  constructor() {
    this.ormRepository = getRepository(PatientMenu);
  }

  async findBy(filter: Partial<PatientMenu>): Promise<PatientMenu | undefined> {
    const patientMenu = await this.ormRepository.findOne(filter);

    return patientMenu;

  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<PatientMenu>): Promise<IPaginatedResponse<PatientMenu>> {
    const patientMenus = await this.ormRepository.find({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    const patientMenuTotal = await this.ormRepository.count(filters);

    return {
      results: patientMenus,
      total: patientMenuTotal,
      page,
      limit,
    };
  }

  public async show(id: string): Promise<IPaginatedResponse<PatientMenu>> {

      const patientMenus = await this.ormRepository.find(
        {
          where: {id},
        },
      );

      const patientMenuTotal = await this.ormRepository.count();

      return {
        results: patientMenus,
        total: patientMenuTotal,
        page: 1,
        limit: 10,
      };
    }

  create({
    user_id,
    dayofweek,
    hour,
    description,
  }: IPatientMenuCreate): PatientMenu {
    const patientMenu = this.ormRepository.create({
      user_id,
      dayofweek,
      hour,
      description,
    });

    return patientMenu;
  }

  public async save(patientMenu: PatientMenu): Promise<PatientMenu> {
    const patientMenuSaved = await this.ormRepository.save(patientMenu);

    return patientMenuSaved;
  }

  public async remove(patientMenu: PatientMenu): Promise<void> {
    await this.ormRepository.remove(patientMenu);
  }
}

  export { PatientMenuRepository};

import { IPaginatedRequest } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { Repository, getRepository } from "typeorm";
import { PatientData } from "../entities/PatientData";
import { IPatientDataCreate } from "./dto/PatientDataRepositoryDTO";
import { IPatientDataRepository } from "./PatientDataRepositories.interface";

class PatientDataRepository implements IPatientDataRepository {
  private ormRepository: Repository<PatientData>;

  constructor() {
    this.ormRepository = getRepository(PatientData);
  }

  async findBy(filter: Partial<PatientData>): Promise<PatientData | undefined> {
    const patientData = await this.ormRepository.findOne(filter);

    return patientData;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<PatientData>): Promise<IPaginatedResponse<PatientData>> {
    const patientData = await this.ormRepository.find({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    const patientDataTotal = await this.ormRepository.count(filters);

    return {
      results: patientData,
      total: patientDataTotal,
      page,
      limit,
    };
  }

  public async show(id: string): Promise<IPaginatedResponse<PatientData>> {
      const patientData = await this.ormRepository.find(
        {
          where: {id},
        },
      );

      const patientDataTotal = await this.ormRepository.count();

      return {
        results: patientData,
        total: patientDataTotal,
        page: 1,
        limit: 10,
      };
    }

  create({
    colesterol,
    creatinina,
    hemoglobina_glicada,
    peso,
    descricao,
    user_id,
  }: IPatientDataCreate): PatientData {
    const patientData = this.ormRepository.create({
      colesterol,
      creatinina,
      hemoglobina_glicada,
      peso,
      descricao,
      user_id
    });
    return patientData;
  }

  async save(patientData: PatientData): Promise<PatientData> {
   const newPatientData = await this.ormRepository.save(patientData);

    return newPatientData;
  }

  async remove(patientData: PatientData): Promise<void> {
    await this.ormRepository.remove(patientData);
  }
}

export  { PatientDataRepository };

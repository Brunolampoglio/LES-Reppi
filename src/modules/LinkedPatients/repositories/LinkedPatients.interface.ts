import { IPaginatedRequestObri } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { Repository, getRepository } from "typeorm";
import { LinkedPatients } from "../entities/LinkedPatients";
import { ILinkedPatientsCreate } from "./dto/LinkedPatientsRepositoryDTO";
import { ILinkedPatientsRepository } from "./LinkedPatientRepository";

class LinkedPatientsRepository implements ILinkedPatientsRepository {
  private ormRepository: Repository<LinkedPatients>;

  constructor() {
    this.ormRepository = getRepository(LinkedPatients);
  }

  async findBy(filter: Partial<LinkedPatients>): Promise<LinkedPatients | undefined> {
    const linkedPatients = await this.ormRepository.findOne(filter);

    return linkedPatients;

  }

  async listBy({
    page,
    limit,
    filters,
  }: IPaginatedRequestObri<LinkedPatients>): Promise<IPaginatedResponse<LinkedPatients>>{
    const linkedPatients = await this.ormRepository.find({
      where: filters,
      relations: ['user'],
      skip: (page - 1) * limit,
      take: limit,
    });

    const linkedPatientsTotal = await this.ormRepository.count(filters);

    return {
      results: linkedPatients,
      total: linkedPatientsTotal,
      page,
      limit,
    };
  }

  async listByName(
    name: string,
    gestor_id: string
  ): Promise<LinkedPatients>{
    const linkedPatients = await this.ormRepository
      .createQueryBuilder('linkedPatients')
      .leftJoinAndSelect('linkedPatients.user', 'user')
      .where('linkedPatients.gestor_id = :gestor_id', { gestor_id })
      .andWhere('user.name like :name OR :nullName::text IS NULL',
        {
          name: `%${name}%`,
          nullName: name,
        })
        .take()
        .getMany();

    return linkedPatients[0];
  }

  async index(): Promise<LinkedPatients[]> {
    return this.ormRepository.find();
  }

  create({
    patient_id,
    gestor_id,
  }: ILinkedPatientsCreate): LinkedPatients{
    const linkedPatients = this.ormRepository.create({
      patient_id,
      gestor_id,
    });
    return linkedPatients;
  }

  async save(linkedPatients: LinkedPatients): Promise<LinkedPatients>{
    const newlinkedPatients = await this.ormRepository.save(linkedPatients);
    return newlinkedPatients;
  }

  async saveMany(data: LinkedPatients[]): Promise<LinkedPatients[]> {
    const linkedPatients = await this.ormRepository.save(data);
    return linkedPatients;
  }

  async remove(linkedPatients: LinkedPatients): Promise<void>{
    await this.ormRepository.remove(linkedPatients);
  }
}

export { LinkedPatientsRepository };

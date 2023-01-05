import { IPaginatedRequest } from "@shared/interfaces/IPaginatedRequest";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { Repository, getRepository } from "typeorm";
import { Prescriptions } from "../entities/Prescriptions";
import { IPrescriptionCreate } from "./dto/PrescriptionDTO";
import { IPrescriptionsRepository } from "./Prescriptions.interface";


class PrescriptionsRepository implements IPrescriptionsRepository {
  private ormRepository: Repository<Prescriptions>;

  constructor() {
    this.ormRepository = getRepository(Prescriptions);
  }

  async findBy(filter: Partial<Prescriptions>): Promise<Prescriptions | undefined> {
    const prescription = await this.ormRepository.findOne(filter);

    return prescription;

  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<Prescriptions>): Promise<IPaginatedResponse<Prescriptions>> {
    const [prescriptions, prescriptionsTotal] = await this.ormRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      results: prescriptions,
      total: prescriptionsTotal,
      page,
      limit,
    };
  }

  create({
    anexo,
    patient_id,
  }: IPrescriptionCreate): Prescriptions {
    const prescription = this.ormRepository.create({
      anexo,
      patient_id,
    });

    return prescription;
  }

  async save(prescription: Prescriptions): Promise<Prescriptions> {
    const prescriptionSaved = await this.ormRepository.save(prescription);

    return prescriptionSaved;
  }

  async remove(prescription: Prescriptions): Promise<void> {
    await this.ormRepository.remove(prescription);
  }
}

export { PrescriptionsRepository };

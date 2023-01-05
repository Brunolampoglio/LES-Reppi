import { qrCode_config } from "@config/auth";
import { IRedisProvider } from "@shared/container/providers/RedisProvider/model/IRedisProvider";
import { AppError } from "@shared/error/AppError";
import { instanceToInstance } from "class-transformer";
import { inject, injectable } from "tsyringe";
import { PatientData } from "../entities/PatientData";
import { IPatientDataRepository } from "../repositories/PatientDataRepositories.interface";
import { IShowPatientDataDTO } from "./dto/ShowPatientDataDTO";

@injectable()
class ShowPatientDataService {
  constructor(
    @inject("PatientDataRepository")
    private patientDataRepository: IPatientDataRepository,

    @inject('RedisProvider')
    private redisProvider: IRedisProvider,
  ) {}

  public async execute({qr_code}:IShowPatientDataDTO): Promise<PatientData> {
    const patient_id = await this.redisProvider.get(`${qrCode_config.prefix}${qr_code}`);

    if(!patient_id) throw new AppError('QR Code inválido', 401);

    const patientData = await this.patientDataRepository.findBy({ user_id: patient_id });

    if(!patientData) throw new AppError('Dados do paciente não encontrados', 404);

    await this.redisProvider.del(`${qrCode_config.prefix}${qr_code}`);

    return instanceToInstance(patientData);
  }
}

export { ShowPatientDataService };

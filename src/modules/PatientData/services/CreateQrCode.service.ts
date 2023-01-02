import { IRedisProvider } from "@shared/container/providers/RedisProvider/model/IRedisProvider";
import { inject, injectable } from "tsyringe";
import { IPatientDataRepository } from "../repositories/PatientDataRepositories.interface";
import { ICreateQrCodeDTO, ICreateQrCodeResponseDTO } from "./dto/CreateQrCodeDTO";
import crypto from 'crypto';
import { qrCode_config } from "@config/auth";
import { AppError } from "@shared/error/AppError";


@injectable()
class CreateQrCodeService {
  constructor(
    @inject('RedisProvider')
    private redisProvider: IRedisProvider,

    @inject("PatientDataRepository")
    private patientDataRepository: IPatientDataRepository,
  ){}


  public async execute({patient_id}: ICreateQrCodeDTO): Promise<ICreateQrCodeResponseDTO> {
    const patientData = await this.patientDataRepository.findBy({user_id: patient_id});

    if(!patientData) throw new AppError('Dados do Paciente não encontrados', 404);


    const qrCode =  crypto.randomBytes(3).toString('hex');

    await this.redisProvider.set({
      key: `${qrCode_config.prefix}${qrCode}`,
      value: patientData.id,
      time: qrCode_config.expiresIn,
      option: 'EX',
    });

    return {qr_code: qrCode};
 }
}

export { CreateQrCodeService };

import { inject, injectable } from "tsyringe";
import { Certificate } from "../entities/Certificates";
import { ICertificateRepository } from "../repositories/CertificateRepositories.interface";
import { ICreateCertificateDTO } from "./dto/CreateCertificateDTO";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

@injectable()
 class CreateCertificateService {
    constructor(
        @inject('CertificateRepository')
        private certificateRepository: ICertificateRepository,
    ){}

    public async execute({
        user_id,
        anexo
    }: ICreateCertificateDTO): Promise<Certificate> {
        const date_now = dayjs.utc().format('DD/MM/YYYY');

        const certificate = this.certificateRepository.create({
            data: date_now,
            user_id,
            anexo
        });

        await this.certificateRepository.save(certificate);

        return certificate;
    }
 }
 export { CreateCertificateService };

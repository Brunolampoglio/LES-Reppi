import { inject, injectable } from "tsyringe";
import { LinkedPatients } from "../entities/LinkedPatients";
import { ILinkedPatientsRepository } from "../repositories/LinkedPatientRepository";
import { ICreateLinkedPatientsDTO } from "./dto/CreateLinkedPatientsDTO";
import * as XLSX from 'xlsx';
import { IUserRepository } from "@modules/User/repositories/UserRepository.interface";
import { User } from "@modules/User/entities/User";
import { AppError } from "@shared/error/AppError";
import path from 'path';
import { uploadConfig } from "@config/upload";

type XLSXFields = {
  CPF: string;
  CONVENIO: string;
}

@injectable()
class CreateLinkedPatientsService {
  constructor(
    @inject('LinkedPatientsRepository')
    private linkedPatientsRepository: ILinkedPatientsRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ){}

  public async execute({
    anexo, // Anexo como nome do arquivo
    gestor_id,
  }: ICreateLinkedPatientsDTO): Promise<LinkedPatients[]> {

    const filepath = path.resolve(uploadConfig.tmpFolder, anexo)

    const workbook = XLSX.readFile(filepath);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const fields = XLSX.utils.sheet_to_json<XLSXFields>(sheet);

    const users = await this.userRepository.index();
    const linkeds = await this.linkedPatientsRepository.index();


    const linkedPatients = fields.map(({CPF, CONVENIO}) => {
      const user = users.find((user) => user.cpf === CPF);

      if(!user) {
        throw new AppError(`Usuário com CPF: ${CPF} não encontrado!`, 404);
      }

      const linked = linkeds.find((linked) => linked.patient_id === user.id && linked.gestor_id === gestor_id);

      if(linked) {
        throw new AppError(`Usuário com CPF: ${CPF} já está vinculado ao gestor!`, 400);
      }

      const linkedPatient = this.linkedPatientsRepository.create({
        gestor_id,
        patient_id: user.id,
        health_insurance: CONVENIO,
      });

      return linkedPatient;
    });



    await this.linkedPatientsRepository.saveMany(linkedPatients);


    return linkedPatients;

  }
}

export { CreateLinkedPatientsService };

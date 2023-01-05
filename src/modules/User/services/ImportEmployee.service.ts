import { uploadConfig } from "@config/upload";
import { AppError } from "@shared/error/AppError";
import path from "path";
import { injectable, inject } from "tsyringe";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/UserRepository.interface";
import * as XLSX from 'xlsx';
import { Roles } from "@shared/enum/Roles";
import { IImportEmployeeDTO } from "./dto/ImportEmployeeDTO";
import { instanceToInstance } from "class-transformer";
import { IHashProvider } from "@shared/container/providers/HashProvider/model/IHashProvider";


type XLSXFields = {
  CPF: string;
  NAME: string;
  EMAIL: string;
  PASSWORD: string;
  PHONE_NUMBER: string;
  FUNCAO: string;
}

@injectable()
class ImportEmployeeService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    anexo, // Anexo como nome do arquivo
    gestor_id
  }: IImportEmployeeDTO): Promise<User[]> {
    const filepath = path.resolve(uploadConfig.tmpFolder, anexo)

    const workbook = XLSX.readFile(filepath);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const fields = XLSX.utils.sheet_to_json<XLSXFields>(sheet);

    const users = await this.userRepository.index();

    const importadEmployees = fields.map(({CPF, NAME, EMAIL, FUNCAO, PASSWORD, PHONE_NUMBER}) => {
      const employee = users.find((user) => user.email === EMAIL);

      if(employee) {
        throw new AppError(`Usuário com email: ${EMAIL} já está cadastrado no sistema!`, 404);
      }

      const CreateEmployee = this.userRepository.create({
        cpf: CPF,
        name: NAME,
        email: EMAIL,
        password: PASSWORD,
        role: Roles.employee,
        phone_number: PHONE_NUMBER,
        position: FUNCAO,
        gestor_id,
      });

      return CreateEmployee;
    });



    await this.userRepository.saveAll(importadEmployees);

    return instanceToInstance(importadEmployees);

  }

}

export { ImportEmployeeService };






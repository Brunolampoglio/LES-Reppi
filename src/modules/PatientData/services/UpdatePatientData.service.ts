import { IGoalsPatientRepository } from "@modules/GoalsPatient/repositories/GoalsRepositories.interface";
import { IMyPointsRepository } from "@modules/myPoints/repositories/MyPointsRepositories.interface";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/error/AppError";
import { instanceToInstance } from "class-transformer";
import { inject, injectable } from "tsyringe";
import { PatientData } from "../entities/PatientData";
import { IPatientDataRepository } from "../repositories/PatientDataRepositories.interface";
import { IPatientDataUpdate } from "./dto/UpdatePatientDataDTO";

@injectable()
class UpdatePatientDataService {
  constructor(
    @inject("PatientDataRepository")
    private patientDataRepository: IPatientDataRepository,

    @inject("GoalsPatientRepository")
    private goalsPatientRepository: IGoalsPatientRepository,

    @inject("MyPointsRepository")
    private myPointsRepository: IMyPointsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    colesterol,
    creatinina,
    hemoglobina_glicada,
    peso,
    descricao,
    patientDataId,
    anexo,
  }: IPatientDataUpdate): Promise<PatientData> {

    let points = 0;
    const patientDataExists = await this.patientDataRepository.findBy({
      id: patientDataId,
    });

    if (!patientDataExists) throw new AppError("Dados do paciente não encontrado", 404);

    const userPoints = await this.myPointsRepository.findBy({user_id: patientDataExists.user_id});

    if (!userPoints) throw new AppError("Pontos do usuário não encontrado", 404);

    const [goalsPatientColesterol,goalsPatientCreatinina, goalsPatientHemoglobinaGlicada,goalsPatientPeso ] =
    await Promise.all([
      this.goalsPatientRepository.findBy({typeofgoal: 'colesterol', patient_id: patientDataExists.user_id }),
      this.goalsPatientRepository.findBy({typeofgoal: 'creatinina', patient_id: patientDataExists.user_id}),
      this.goalsPatientRepository.findBy({typeofgoal: 'hemoglobina_glicada', patient_id: patientDataExists.user_id}),
      this.goalsPatientRepository.findBy({typeofgoal: 'peso', patient_id: patientDataExists.user_id}),
    ]);


    if (goalsPatientColesterol) {
      goalsPatientColesterol.status = 'em andamento';

      if(colesterol <= goalsPatientColesterol.from && colesterol >= goalsPatientColesterol.to){
        goalsPatientColesterol.status = 'concluido';
        points += goalsPatientColesterol.points;

      }

      await this.goalsPatientRepository.save(goalsPatientColesterol);

    }

    if (goalsPatientCreatinina) {
      goalsPatientCreatinina.status = 'em andamento';

      if(creatinina <= goalsPatientCreatinina.from && creatinina >= goalsPatientCreatinina.to ){
        goalsPatientCreatinina.status = 'concluido';
        points += goalsPatientCreatinina.points;

      }

      await this.goalsPatientRepository.save(goalsPatientCreatinina);

    }

    if (goalsPatientHemoglobinaGlicada) {
      goalsPatientHemoglobinaGlicada.status = 'em andamento';

      if(hemoglobina_glicada <= goalsPatientHemoglobinaGlicada.from && hemoglobina_glicada >= goalsPatientHemoglobinaGlicada.to ){
        goalsPatientHemoglobinaGlicada.status = 'concluido';
        points += goalsPatientHemoglobinaGlicada.points;

      }

      await this.goalsPatientRepository.save(goalsPatientHemoglobinaGlicada);

    }

    let pesoMeta = 0;


    if (goalsPatientPeso) {

      goalsPatientPeso.status = 'em andamento';

      pesoMeta = parseInt(goalsPatientPeso?.to);
      const newPeso = parseInt(peso);

     if(goalsPatientPeso.type === 'perder'){
        if(newPeso >= pesoMeta ){
          goalsPatientPeso.status = 'concluido';
          points += goalsPatientPeso.points;
        }else{
          const newPeso = parseInt(peso);
            if(newPeso <= pesoMeta ){
              goalsPatientPeso.status = 'concluido';
              points += goalsPatientPeso.points;
        }
      }
    }
        // goalsPatientPeso.from =peso;
        await this.goalsPatientRepository.save(goalsPatientPeso);
  }

  Object.assign(patientDataExists, {
      colesterol: colesterol,
      creatinina: creatinina,
      hemoglobina_glicada: hemoglobina_glicada,
      peso: peso,
      descricao: descricao,
    });

    userPoints.points = points;

    if(anexo){
        const filename = await this.storageProvider.saveFile(anexo);
        if(patientDataExists.eletrocardiograma) {
          await this.storageProvider.deleteFile(patientDataExists.eletrocardiograma);
      }
      patientDataExists.eletrocardiograma = filename;
    }


    await this.patientDataRepository.save(patientDataExists);
    await this.myPointsRepository.save(userPoints);

      return instanceToInstance(patientDataExists);
  }
}




export { UpdatePatientDataService };

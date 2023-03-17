import { Flag } from '../entities/Flag';
import { ICreateFlagRepositoryDTO } from './dto/CreateFlagRepositoryDTO';

interface IFlagRepository {
  create(flag: ICreateFlagRepositoryDTO): Flag;
  index(): Promise<Flag[]>;
  findById(id: string): Promise<Flag | undefined>;
  save(flag: Flag): Promise<Flag>;
  delete(flag: Flag): Promise<void>;
}
export { IFlagRepository };

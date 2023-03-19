import { Cupon } from '../entities/Cupon';
import { ICreateCuponDTO } from './dto/CuponRepositoryDTO';

export interface ICuponRepository {
  index(): Promise<Cupon[]>;
  findByName(name: string): Promise<Cupon | undefined>;
  findById(id: string): Promise<Cupon | undefined>;
  create(cupon: ICreateCuponDTO): Cupon;
  save(cupon: Cupon): Promise<Cupon>;
  remove(cupon: Cupon): Promise<void>;
}

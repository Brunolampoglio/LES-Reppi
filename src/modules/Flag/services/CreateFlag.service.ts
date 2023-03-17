/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';
import { Flag } from '../entities/Flag';
import { IFlagRepository } from '../repositories/FlagRepository.interface';
import { ICreateFlagDTO } from './dto/CreateFlagDTO';

@injectable()
class CreateFlagService {
  constructor(
    @inject('FlagRepository')
    private flagRepository: IFlagRepository,
  ) { }

  public async execute({ name }: ICreateFlagDTO): Promise<Flag> {
    const flag = this.flagRepository.create({ name });

    await this.flagRepository.save(flag);
    return flag;
  }
}
export { CreateFlagService };

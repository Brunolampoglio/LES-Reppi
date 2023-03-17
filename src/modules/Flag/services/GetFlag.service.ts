/* eslint-disable prettier/prettier */
import { injectable, inject } from 'tsyringe';
import { Flag } from '../entities/Flag';
import { IFlagRepository } from '../repositories/FlagRepository.interface';

@injectable()
class GetFlagService {
  constructor(
    @inject('FlagRepository')
    private flagRepository: IFlagRepository,
  ) { }

  public async execute(): Promise<Flag[]> {
    const flag = await this.flagRepository.index();

    return flag;
  }
}

export { GetFlagService };

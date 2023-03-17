/* eslint-disable prettier/prettier */
import { AppError } from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import { IFlagRepository } from '../repositories/FlagRepository.interface';

@injectable()
class DeleteFlagService {
  constructor(
    @inject('FlagRepository')
    private flagRepository: IFlagRepository,
  ) { }

  public async execute(id: string): Promise<void> {
    const flag = await this.flagRepository.findById(id);

    if (!flag) {
      throw new AppError('Bandeira não encontrada', 404);
    }

    await this.flagRepository.delete(flag);
  }
}
export { DeleteFlagService };

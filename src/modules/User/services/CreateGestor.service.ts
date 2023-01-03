import { instanceToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/error/AppError';
import { IHashProvider } from '@shared/container/providers/HashProvider/model/IHashProvider';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { ICreateGestorDTO } from './dto/CreateUserDTO';
import { Address } from '../entities/Address';
import { Invoices } from '../../invoices/entities/Invoices';
import { IPlansRepository } from '@modules/Plans/repositories/PlanRepositories.interface';
import { IInvoicesRepository } from '../../invoices/repositories/InvoicesRepositories.interface';
import { ICardRepository } from '@modules/Cards/repositories/CardRepositories.interface';
import { Card } from '@modules/Cards/entities/Card';

@injectable()
class CreateGestorService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('PlanRepository')
    private planRepository: IPlansRepository,

    @inject("CardRepository")
    private cardRepository: ICardRepository,

    @inject("InvoiceRepository")
    private invoicesRepository: IInvoicesRepository,

  ) {}

  public async execute({
    name,
    email,
    password,
    role,
    corporate_name,
    cnpj,
    cpf,
    position,
    address,
    phone_number,
    card,
    plan_id,
  }: ICreateGestorDTO): Promise<User> {
    const [user_exists, user_existsCnpj, user_existsCpf] = await Promise.all([
      this.userRepository.findBy({
        email,
      }),
      this.userRepository.findBy({ cnpj }),
      this.userRepository.findBy({ cpf }),
    ]);

    if (user_exists || user_existsCnpj || user_existsCpf)
      throw new AppError('Usuário já cadastrado');

    const hashed_password = await this.hashProvider.generateHash(password);
    const addressInstance = new Address();
    const invoiceInstance = new Invoices();
    const cardInstance = new Card();

    const plans = await this.planRepository.findBy({ id: plan_id });

    if(!plans) {
      throw new AppError("Plano não encontrado");
    }

    const user = this.userRepository.create({
      name,
      email,
      password: hashed_password,
      role,
      corporate_name,
      cnpj,
      cpf,
      position,
      phone_number,
    });

    if(address) {
      Object.assign(addressInstance, { ...address });
      user.address = addressInstance;
    }

    await this.userRepository.save(user);


    Object.assign(invoiceInstance, {
      desc: plans.name,
      plan_id: plans.id,
      user_id: user.id,
    });

    const first_digits = card.digits.slice(0, 4);
    const last_digits = card.digits.slice(-4);

    const expiration_month = card.expiration.slice(0, 2);
    const expiration_year = card.expiration.slice(-4);

    const month = Number(expiration_month);
    const year = Number(expiration_year);

    Object.assign(cardInstance, {
     first_digits,
      last_digits,
      holder_name: card.holder_name,
      expiration_month: month,
      expiration_year: year,
      main: card.main,
      user_id: user.id,
      external_id: 'card.external_id',
      brand: 'visa',
    });
    // TODO: Alterar status de acordo com o status de pagamento

    await this.cardRepository.save(cardInstance);
    await this.invoicesRepository.save(invoiceInstance);

    return instanceToInstance(user);
  }
}

export { CreateGestorService };

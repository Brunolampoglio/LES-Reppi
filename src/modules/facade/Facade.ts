import { IGetEntity } from "@modules/controller/viewHelper/interface/IViewHelper";
import Domain from "@modules/models/Domain";
import { DAOAddress } from "@modules/repositories/DAOAddress";
import { DAOGender } from "@modules/repositories/DAOGender";
import { DAOPerson } from "@modules/repositories/DAOPerson";
import { DAOUser } from "@modules/repositories/DAOUser";
import { IDAO } from "@modules/repositories/interfaces/IDAO";
import { IValidate } from "@modules/validators/IValidate";
import { ValidateAddress } from "@modules/validators/ValidateAddress";
import { ValidateCPF } from "@modules/validators/ValidateCPF";
import { ValidateGender } from "@modules/validators/ValidateGender";
import { ValidatePerson } from "@modules/validators/ValidatePerson";
import { ValidatePhone } from "@modules/validators/ValidatePhone";
import IHash from "@shared/interfaces/IHash";
import { IPaginatedResponse } from "@shared/interfaces/IPaginatedResponse";
import { createConnections, FindManyOptions } from "typeorm";
import { IFacade } from "./IFacade";


export class Facade implements IFacade {
	private validators: IHash<IValidate> = {};
	private daos: IHash<IDAO<Domain>> = {};
	private isConected = false;

	constructor() {
		const validateAddress = new ValidateAddress();
		const validatePhone = new ValidatePhone();
		const validateCPF = new ValidateCPF();
    const validateGender = new ValidateGender();
		const validatePerson = new ValidatePerson(
			validateAddress,
			validatePhone,
			validateCPF
		);

		this.validators.address = validateAddress;
		this.validators.person = validatePerson;
		this.validators.gender = validateGender;

		console.clear();
		console.log('[BANCO DE DADOS 🎲] Conectando com o banco de dados...');
		createConnections()
			.then(() => {
				console.clear();
				console.log('[BANCO DE DADOS 🎲] Conectado com sucesso!');

				this.daos.user = new DAOUser() as any;
				this.daos.person = new DAOPerson() as any;
				this.daos.gender = new DAOGender() as any;
				this.daos.address = new DAOAddress() as any;

				this.isConected = true
			})
			.catch(err => console.log(err));
	}

	async create(entity: Domain): Promise<string> {
		if (!this.isConected) {
			throw new Error('O Sistema ainda está inicializando...')
		}

		const entityName = entity.constructor.name.toLowerCase();

		if (
			!this.daos[entityName] ||
			!this.validators[entityName]
		) {
			throw new Error('Tipo de pedido não encontrado');
		}

		const validatorInstance = this.validators[entityName];
		await validatorInstance.validate(entity);
		const daoInstance = this.daos[entityName];
		await daoInstance.save(entity);

		return 'Cadastrado com sucesso';
	}

	async update(entity: Domain): Promise<string> {
		if (!this.isConected) {
			throw new Error('O Sistema ainda está inicializando...')
		}

		const entityName = entity.constructor.name.toLowerCase();

		if (
			!this.daos[entityName] ||
			!this.validators[entityName]
		) {
			throw new Error('Tipo de pedido não encontrado');
		}

		const validatorInstance = this.validators[entityName];
		await validatorInstance.validate(entity);
		const daoInstance = this.daos[entityName];
		const entityExists = await daoInstance.findOne({
			where: {
				id: entity.id
			}
		});

		if (!entityExists) throw new Error('Não encontrado');
		Object.assign(entityExists, entity);

		await daoInstance.save(entityExists);

		return 'Atualizado com sucesso';
	}

	async delete(entity: Domain): Promise<string> {
		if (!this.isConected) {
			throw new Error('O Sistema ainda está inicializando...')
		}

		const entityName = entity.constructor.name.toLowerCase();

		if (
			!this.daos[entityName]
		) {
			throw new Error('Tipo de pedido não encontrado');
		}

		if (!entity.id) throw new Error('Item não selecionado');

		const daoInstance = this.daos[entityName];
		await daoInstance.remove(entity);

		return 'Removido com sucesso';
	}

	async findOne({
		entity,
		whereParams,
	}: IGetEntity): Promise<Domain | undefined | null> {
		if (!this.isConected) {
			throw new Error('O Sistema ainda está inicializando...')
		}

		const entityName = entity.constructor.name.toLowerCase();

		if (
			!this.daos[entityName]
		) {
			throw new Error('Tipo de pedido não encontrado');
		}

		const daoInstance = this.daos[entityName];
		return await daoInstance.findOne(whereParams);
	}

	async findMany({
		entity,
		whereParams,
	}: IGetEntity): Promise<Domain[]> {
		if (!this.isConected) {
			throw new Error('O Sistema ainda está inicializando...')
		}

		const entityName = entity.constructor.name.toLowerCase();

		if (
			!this.daos[entityName]
		) {
			throw new Error('Tipo de pedido não encontrado');
		}

		const daoInstance = this.daos[entityName];
		return await daoInstance.findMany(whereParams);
	}

	async index({
		entity,
		whereParams,
		page,
		limit,
	}: IGetEntity): Promise<IPaginatedResponse<Domain>> {
		if (!this.isConected) {
			throw new Error('O Sistema ainda está inicializando...')
		}

		const entityName = entity.constructor.name.toLowerCase();

		if (
			!this.daos[entityName]
		) {
			throw new Error('Tipo de pedido não encontrado');
		}

		const daoInstance = this.daos[entityName];
		return await daoInstance.index({
			page,
			limit,
			where: whereParams
		});
	}
}

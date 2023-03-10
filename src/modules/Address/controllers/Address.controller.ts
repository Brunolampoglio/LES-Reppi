import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateAddressService } from '../services/CreateAddress.service';
import { UpdateAddressService } from '../services/UpdateAddress.service';
import { DeleteAddressService } from '../services/DeleteAddress.service';
import { GetAddressService } from '../services/GetAddress.service';

class AddressController {
  async create(req: Request, res: Response) {
    const {
      street,
      number,
      obs,
      type_residence,
      street_type,
      neighborhood,
      city,
      zip,
      uf,
      is_default,
      country,
    } = req.body;

    const createAddressController = container.resolve(CreateAddressService);

    const address = await createAddressController.execute({
      street,
      country,
      number,
      obs,
      street_type,
      type_residence,
      neighborhood,
      is_default,
      city,
      zip,
      uf,
      user_id: req.user.id,
    });

    return res.json(address);
  }

  async update(req: Request, res: Response) {
    const {
      street,
      number,
      obs,
      type_residence,
      street_type,
      neighborhood,
      city,
      zip,
      uf,
      is_default,
      country,
    } = req.body;

    const { address_id } = req.query as {
      [key: string]: string;
    };

    const updateAddressController = container.resolve(UpdateAddressService);

    const address = await updateAddressController.execute({
      address_id,
      street,
      country,
      number,
      obs,
      street_type,
      type_residence,
      neighborhood,
      is_default,
      city,
      zip,
      uf,
    });

    return res.json(address);
  }

  async get(req: Request, res: Response) {
    const getAddresController = container.resolve(GetAddressService);

    const address = await getAddresController.execute(req.user.id);

    return res.json(address);
  }

  async delete(req: Request, res: Response) {
    const { address_id } = req.query as {
      [key: string]: string;
    };

    const deleteAddressController = container.resolve(DeleteAddressService);

    await deleteAddressController.execute(address_id);

    return res.json({ message: 'Endereço excluido com sucesso' });
  }
}

export { AddressController };

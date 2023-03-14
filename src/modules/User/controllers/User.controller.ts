import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserService } from '../services/CreateUser.service';
import { DeleteUserService } from '../services/DeleteUser.service';
import { FindUserService } from '../services/FindUser.service';
import { GetUserService } from '../services/GetUser.service';
import { UpdateUserService } from '../services/UpdateUser.service';
import { UpdateUserStatusService } from '../services/UpdateUserStatus.service';

class UserController {
  async create(req: Request, res: Response) {
    const {
      name,
      email,
      password,
      cpf,
      phone,
      gender,
      birth_date,
      type_phone,
      address,
    } = req.body;

    const createUserController = container.resolve(CreateUserService);

    const user = await createUserController.execute({
      name,
      email,
      password,
      cpf,
      phone,
      gender,
      birth_date,
      type_phone,
      address,
    });

    return res.json(user);
  }

  async updateStatus(req: Request, res: Response) {
    const { status } = req.body;
    const { user_id } = req.params;

    const updateUserStatusController = container.resolve(
      UpdateUserStatusService,
    );

    const user = await updateUserStatusController.execute({
      user_id,
      status,
    });

    return res.json(user);
  }

  async update(req: Request, res: Response) {
    const { name, birth_date, email, cpf, gender, phone, type_phone } =
      req.body;

    const { user_id } = req.query as {
      [key: string]: string;
    };

    const updateUserController = container.resolve(UpdateUserService);

    const user = await updateUserController.execute({
      user_id,
      name,
      birth_date,
      email,
      cpf,
      gender,
      phone,
      type_phone,
    });

    return res.json(user);
  }

  async index(req: Request, res: Response) {
    const getUserController = container.resolve(GetUserService);

    const user = await getUserController.execute();

    return res.json(user);
  }

  async findById(req: Request, res: Response) {
    const { user_id } = req.params;

    const FindUserController = container.resolve(FindUserService);

    const user = await FindUserController.execute(user_id);

    return res.json(user);
  }

  async delete(req: Request, res: Response) {
    const { user_id } = req.params;

    const deleteUserController = container.resolve(DeleteUserService);

    await deleteUserController.execute(user_id);

    return res.status(204).send();
  }
}
export { UserController };

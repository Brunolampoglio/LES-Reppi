import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { ConfirmEmailService } from '../services/ConfirmEmail.service';

import { CreateUserService } from '../services/CreateUser.service';
import { DeleteUserService } from '../services/DeleteUser.service';
import { ListEmployeeByGestorService } from '../services/ListEmployeeByGestor.service';
import { ListGestorService } from '../services/ListGestor.service';
import { ListUserService } from '../services/ListUser.service';
import { ShowUserService } from '../services/ShowUser.service';
import { UpdateStatusService } from '../services/UpdateStatus.service';
import { UpdateUserService } from '../services/UpdateUser.service';

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, cnpj, cpf, password, role, corporate_name, position, address, phone_number } = req.body;


    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      cnpj,
      cpf,
      password,
      role,
      corporate_name,
      position,
      address,
      phone_number
    });

    return res.status(201).json(user);
  }

  async createByGestor(req: Request, res: Response): Promise<Response> {
    const { name, email, cnpj, cpf, password, role, corporate_name, position, address, phone_number } = req.body;

    const gestor_id = req.user.id;
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      cnpj,
      cpf,
      password,
      role,
      corporate_name,
      position,
      address,
      phone_number,
      gestor_id,
    });

    return res.status(201).json(user);
  }

  async listUser(req: Request, res: Response): Promise<Response> {
      const listUserService = container.resolve(ListUserService);

      const { page, limit, role } = req.query as {
        [key: string]: string;
      };

      const users = await listUserService.execute({
      limit: parseInt(limit, 10) || 50,
      page: parseInt(page, 10) || 1,
      isMaster: req.user.isMaster,
      });

      return res.json(users);
  }

  async listGestor(req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.query as {
      [key: string]: string;
    };

    const listUserService = container.resolve(ListGestorService);

    const users = await listUserService.execute({
      limit: parseInt(limit, 10) || 50,
      page: parseInt(page, 10) || 1,
      isMaster: req.user.isMaster,
    });

    return res.json(users);
  }

  async listEmployeeByGestor(req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.query as {
      [key: string]: string;
    };

    const { gestor_id } = req.params;

    const listEmployeeByGestorService = container.resolve(ListEmployeeByGestorService);

    const users = await listEmployeeByGestorService.execute({
      limit: parseInt(limit, 10) || 50,
      page: parseInt(page, 10) || 1,
      gestor_id,
      isMaster: req.user.isMaster,
    });

    return res.json(users);

  }


  async show(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    const { user: userRequest } = req;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute({
      user_id,
      isMaster: userRequest.isMaster,
      request_id: userRequest.id,
    });

    return res.json(user);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    const { id } = req.user;
    const { name, cpf, cnpj, corporate_name } = req.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      user_id,
      request_id: id,
      name,
      cpf,
      cnpj,
      corporate_name,
      isMaster: req.user.isMaster,
    });

    return res.json(user);
  }

  async updateStatus(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;

    const { status } = req.body;

    const updateStatusService = container.resolve(UpdateStatusService);

    const user = await updateStatusService.execute({
      user_id,
      isMaster: req.user.isMaster,
      status,
    });

    return res.json(user);
  }


  async delete(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute({
      user_id,
     isMaster: req.user.isMaster,
    });

    return res.status(204).send();
  }

  async confirm(req: Request, res: Response): Promise<Response> {
    const { token } = req.body;

    const confirmEmailService = container.resolve(ConfirmEmailService);

    await confirmEmailService.execute({
      token,
    });

    return res.status(204).json();
  }
}

export { UserController };

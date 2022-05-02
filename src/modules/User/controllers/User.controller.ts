import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserService } from '../services/CreateUser.service';

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ email, password });

    return res.status(201).json(instanceToInstance(user));
  }
}

export { UserController };

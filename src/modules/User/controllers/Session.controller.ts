import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSessionService } from '../services/CreateSession.service';

class SessionController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSessionService = container.resolve(CreateSessionService);

    const resp = await createSessionService.execute({
      email,
      password,
    });

    return res.json(resp);
  }
}

export { SessionController };

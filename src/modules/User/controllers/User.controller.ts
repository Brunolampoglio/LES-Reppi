import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { CreateUserService } from '../services/CreateUser.service';

class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password, cpf, phone, gender, birth_date, type_phone} = req.body;

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
        });

        return res.json(user);

    }
}
export { UserController };
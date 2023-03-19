import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateCuponService } from '../services/CreateCupon.service';
import { IndexCuponService } from '../services/IndexCupon.service';
import { UpdateCuponService } from '../services/UpdateCupon.service';
import { DeleteCuponService } from '../services/DeleteCupon.service';

class CuponController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, description, value, active } = req.body;

    const createCuponService = container.resolve(CreateCuponService);

    const cupon = await createCuponService.execute({
      name,
      description,
      value,
      active,
    });

    return res.status(201).json(cupon);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const indexCuponService = container.resolve(IndexCuponService);

    const cupons = await indexCuponService.execute();

    return res.json(cupons);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { cupon_id } = req.params;
    const { name, description, value, active } = req.body;

    const updateCuponService = container.resolve(UpdateCuponService);

    const cupon = await updateCuponService.execute({
      cupon_id,
      name,
      description,
      value,
      active,
    });

    return res.json(cupon);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { cupon_id } = req.params;

    const deleteCuponService = container.resolve(DeleteCuponService);

    await deleteCuponService.execute({
      cupon_id,
    });

    return res.status(204).send();
  }
}
export { CuponController };

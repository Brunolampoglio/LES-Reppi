import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateCouponService } from '../services/CreateCoupon.service';
import { IndexCouponService } from '../services/IndexCoupon.service';
import { UpdateCouponService } from '../services/UpdateCoupon.service';
import { DeleteCouponService } from '../services/DeleteCoupon.service';
import { UpdateStatusCouponService } from '../services/UpdateStatus.service';
import { FindByIdCouponService } from '../services/FindCouponById.service';
import { FindByNameCouponService } from '../services/FindByName.service';

class CouponController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, description, value } = req.body;

    const createCouponService = container.resolve(CreateCouponService);

    const coupon = await createCouponService.execute({
      name,
      description,
      value,
    });

    return res.status(201).json(coupon);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const indexCouponService = container.resolve(IndexCouponService);

    const coupons = await indexCouponService.execute();

    return res.json(coupons);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { coupon_id } = req.params;

    const findByIdCouponService = container.resolve(FindByIdCouponService);

    const coupon = await findByIdCouponService.execute(coupon_id);

    return res.json(coupon);
  }

  async findByName(req: Request, res: Response): Promise<Response> {
    const { name } = req.query as { name: string };

    const findByNameCouponService = container.resolve(FindByNameCouponService);

    const coupon = await findByNameCouponService.execute(name);

    return res.json(coupon);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { coupon_id } = req.params;
    const { name, description, value, active } = req.body;

    const updateCouponService = container.resolve(UpdateCouponService);

    const cupon = await updateCouponService.execute({
      coupon_id,
      name,
      description,
      value,
      active,
    });

    return res.json(cupon);
  }

  async updateStatus(req: Request, res: Response): Promise<Response> {
    const { coupon_id } = req.params;

    const { active } = req.body;

    const updateCouponService = container.resolve(UpdateStatusCouponService);

    const cupon = await updateCouponService.execute({
      coupon_id,
      active: active === 'ativo',
    });

    return res.json(cupon);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { coupon_id } = req.params;

    const deleteCouponService = container.resolve(DeleteCouponService);

    await deleteCouponService.execute({
      coupon_id,
    });

    return res.status(204).send();
  }
}
export { CouponController };

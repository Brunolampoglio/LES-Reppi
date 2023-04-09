import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateCartService } from '../services/CreateCart.service';
import { IndexCartService } from '../services/IndexCart.service';
import { UpdateCartService } from '../services/UpdateCart.service';
import { DeleteCartService } from '../services/DeleteCart.service';
import { RemoveItemCartService } from '../services/RemoveItemCart.service';
import { FindByIdCartService } from '../services/FindCouponById.service';
import { FindByNameCartService } from '../services/FindByName.service';

class CartController {
  async create(req: Request, res: Response): Promise<Response> {
    const { product_id } = req.body;
    const user_id = req.user.id;

    const createCartService = container.resolve(CreateCartService);

    const cart = await createCartService.execute({ product_id, user_id });

    return res.status(201).json(cart);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const indexCartService = container.resolve(IndexCartService);

    const cart = await indexCartService.execute(user_id);

    return res.json(cart);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { cart_id } = req.params;
    const { product_id, is_subtract } = req.body;

    const updateCartService = container.resolve(UpdateCartService);

    const cart = await updateCartService.execute({
      cart_id,
      product_id,
      is_subtract,
    });

    return res.json(cart);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { cart_id } = req.params;

    const findByIdCouponService = container.resolve(FindByIdCartService);

    const coupon = await findByIdCouponService.execute(cart_id);

    return res.json(coupon);
  }

  async findByName(req: Request, res: Response): Promise<Response> {
    const { name } = req.query as { name: string };

    const findByNameCouponService = container.resolve(FindByNameCartService);

    const coupon = await findByNameCouponService.execute(name);

    return res.json(coupon);
  }

  async removeItem(req: Request, res: Response): Promise<Response> {
    const { cart_id } = req.params;

    const { product_id } = req.body;

    const removeItemCartService = container.resolve(RemoveItemCartService);

    const cart = await removeItemCartService.execute({
      cart_id,
      product_id,
    });

    return res.json(cart);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { cart_id } = req.params;

    const deleteCouponService = container.resolve(DeleteCartService);

    await deleteCouponService.execute({
      cart_id,
    });

    return res.status(204).send();
  }
}
export { CartController };

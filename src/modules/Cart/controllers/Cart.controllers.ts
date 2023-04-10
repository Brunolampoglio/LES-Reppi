import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateCartService } from '../services/CreateCart.service';
import { IndexCartService } from '../services/IndexCart.service';
import { UpdateRemoveCartService } from '../services/UpdateRemoveCart.service';
import { UpdateAddCartService } from '../services/UpdateAddCart.service';
import { RemoveItemCartService } from '../services/RemoveItemCart.service';

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

  async updateAdd(req: Request, res: Response): Promise<Response> {
    const { cart_id } = req.params;
    const { product_id } = req.body;

    const updateAddCartService = container.resolve(UpdateAddCartService);

    const cart = await updateAddCartService.execute({
      cart_id,
      product_id,
    });

    return res.json(cart);
  }

  async updateRemove(req: Request, res: Response): Promise<Response> {
    const { cart_id } = req.params;
    const { product_id } = req.body;

    const updateRemoveCartService = container.resolve(UpdateRemoveCartService);

    const cart = await updateRemoveCartService.execute({
      cart_id,
      product_id,
    });

    return res.json(cart);
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
}
export { CartController };

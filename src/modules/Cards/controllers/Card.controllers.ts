import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateCardService } from '../services/CreateCard.service';
import { UpdateCardService } from '../services/UpdateCard.service';
import { ListAllCardService } from '../services/ListAllCard.service';
import { DeleteCardService } from '../services/DeleteCard.service';

class CardController {
  async create(req: Request, res: Response): Promise<Response> {
    const {
      first_digits,
      last_digits,
      brand,
      holder_name,
      expiration_month,
      expiration_year,
      main,
    } = req.body;

    const createCardService = container.resolve(CreateCardService);

    const card = await createCardService.execute({
      first_digits,
      last_digits,
      brand,
      holder_name,
      expiration_month,
      expiration_year,
      main,
      user_id: req.user.id,
    });

    return res.status(201).json(card);
  }

  async listAll(req: Request, res: Response): Promise<Response> {
    const listAllCardService = container.resolve(ListAllCardService);

    const cards = await listAllCardService.execute({
      user_id: req.user.id,
    });

    return res.json(cards);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { card_id } = req.params;
    const { main } = req.body;

    const updateCardService = container.resolve(UpdateCardService);

    const card = await updateCardService.execute({
      main,
      user_id: req.user.id,
      id: card_id,
    });

    return res.json(card);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { card_id } = req.params;

    const deleteCardService = container.resolve(DeleteCardService);

    await deleteCardService.execute({
      user_id: req.user.id,
      card_id,
    });

    return res.status(204).send();
  }
}

export { CardController };

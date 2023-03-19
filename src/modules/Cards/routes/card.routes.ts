import { verifyToken } from '@shared/middleware/verifyToken';
import { Router } from 'express';
import { CardController } from '../controllers/Card.controllers';
import {
  createCardMiddleware,
  deleteCardMiddleware,
  updateCardMiddleware,
} from './validators/card.validation';

const cardRouter = Router();

const cardController = new CardController();

cardRouter.use(verifyToken);

cardRouter.post('/', createCardMiddleware, cardController.create);

cardRouter.get('/', cardController.listAll);

cardRouter.delete('/:card_id', deleteCardMiddleware, cardController.delete);

cardRouter.put(':card_id', updateCardMiddleware, cardController.update);

export { cardRouter };

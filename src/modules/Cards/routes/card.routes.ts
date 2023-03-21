import { verifyToken } from '@shared/middleware/verifyToken';
import { Router } from 'express';
import { CardController } from '../controllers/Card.controllers';
import {
  createCardMiddleware,
  deleteCardMiddleware,
} from './validators/card.validation';

const cardRouter = Router();

const cardController = new CardController();

cardRouter.use(verifyToken);

cardRouter.post('/', createCardMiddleware, cardController.create);

cardRouter.get('/', cardController.listAll);

cardRouter.patch('/:card_id', cardController.update);

cardRouter.delete('/:card_id', deleteCardMiddleware, cardController.delete);

export { cardRouter };

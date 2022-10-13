import { Router } from 'express';
import { CommentController } from '../controllers/Comments.controller';

const commentRouter = Router();

const commentController = new CommentController();

commentRouter.post('/:userReceiver_id', commentController.create);

export { commentRouter };

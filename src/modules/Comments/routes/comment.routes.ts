import { verifyToken } from '@shared/middleware/verifyToken';
import { Router } from 'express';
import { CommentController } from '../controllers/Comments.controller';

const commentRouter = Router();

const commentController = new CommentController();

commentRouter.use(verifyToken);
commentRouter.post('/:userReceiver_id', commentController.create);
commentRouter.get('/:userReceiver_id', commentController.list);
commentRouter.delete('/:commentId', commentController.delete);
commentRouter.put('/:commentId', commentController.update);

export { commentRouter };

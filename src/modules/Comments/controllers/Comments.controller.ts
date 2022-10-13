import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCommentService } from '../services/CreateComment.service';

class CommentController {
  async create(req: Request, res: Response): Promise<Response> {
    const { comment, rate } = req.body;

    const { userReceiver_id } = req.params;

    const createCommentService = container.resolve(CreateCommentService);

    const comments = await createCommentService.execute({
      comment,
      rate,
      userReceiver_id,
      userSender_id: req.user.id,
    });

    return res.status(201).json(comments);
  }
}
export { CommentController };

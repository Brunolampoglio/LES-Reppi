import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCommentService } from '../services/CreateComment.service';
import { DeleteCommentService } from '../services/DeleteComment.service';
import { ListCommentService } from '../services/ListComment.service';
import { UpdateCommentService } from '../services/UpdateComment.service';

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

  async list(req: Request, res: Response): Promise<Response> {
    const { userReceiver_id } = req.params;
    const { page, limit } = req.query as {
      [key: string]: string;
    };
    const listCommentService = container.resolve(ListCommentService);

    const comments = await listCommentService.execute({
      userReceiver_id,
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 50,
    });

    return res.status(200).json(comments);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { commentId } = req.params;

    const deleteCommentService = container.resolve(DeleteCommentService);

    await deleteCommentService.execute({
      commentId,
      userSender_id: req.user.id,
    });

    return res.status(204).send();
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { commentId } = req.params;
    const { comment, rate } = req.body;

    const updateCommentService = container.resolve(UpdateCommentService);

    const comments = await updateCommentService.execute({
      commentId,
      comment,
      rate,
      userSender_id: req.user.id,
    });

    return res.status(200).json(comments);
  }
}
export { CommentController };

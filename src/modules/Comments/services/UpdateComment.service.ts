import { AppError } from '@shared/error/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import { Comments } from '../entities/Comments';
import { ICommentsRepository } from '../repositories/CommentsRepositories.interface';
import { IUpdateCommentDTO } from './dto/UpdateCommentDTO';

@injectable()
class UpdateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute({
    commentId,
    rate,
    comment,
    userSender_id,
  }: IUpdateCommentDTO): Promise<Comments> {
    const commentExists = await this.commentsRepository.findBy({
      id: commentId,
    });

    if (!commentExists) throw new AppError('Comentário não encontrado', 404);

    if (commentExists.userSender_id !== userSender_id)
      throw new AppError(
        'Você não tem permissão para editar este comentário',
        401,
      );

    Object.assign(commentExists, {
      rate,
      comment,
    });

    const newComment = await this.commentsRepository.save(commentExists);

    return newComment;
  }
}
export { UpdateCommentService };

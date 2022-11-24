// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import { ICommentsRepository } from '../repositories/CommentsRepositories.interface';
import { IDeleteCommentDTO } from './dto/DeleteCommentDTO';

@injectable()
class DeleteCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute({
    commentId,
    userSender_id,
  }: IDeleteCommentDTO): Promise<void> {
    const comment = await this.commentsRepository.findBy({ id: commentId });

    if (!comment) {
      throw new Error('Comentário não encontrado');
    }

    if (comment.userSender_id !== userSender_id) {
      throw new Error('Não tem permissão para deletar este comentário');
    }

    await this.commentsRepository.remove(comment);
  }
}
export { DeleteCommentService };

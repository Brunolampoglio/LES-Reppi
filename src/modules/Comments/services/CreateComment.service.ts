// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import { Comments } from '../entities/Comments';
import { ICommentsRepository } from '../repositories/CommentsRepositories.interface';
import { ICommentCreate } from '../repositories/dto/CommentsRepositoryDTO';

@injectable()
class CreateCommentService {
  constructor(
    @inject('CommentRepository')
    private commentRepository: ICommentsRepository,
  ) {}

  public async execute({
    comment,
    rate,
    userReceiver_id,
    userSender_id,
  }: ICommentCreate): Promise<Comments> {
    const comments = this.commentRepository.create({
      comment,
      rate,
      userReceiver_id,
      userSender_id,
    });

    await this.commentRepository.save(comments);

    return comments;
  }
}
export { CreateCommentService };

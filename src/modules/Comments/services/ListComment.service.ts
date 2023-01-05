import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';
import { Comments } from '../entities/Comments';
import { ICommentsRepository } from '../repositories/CommentsRepositories.interface';
import { IListCommentsDTO } from './dto/ListCommentDTO';

@injectable()
class ListCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute({
    page,
    limit,
    userReceiver_id,
  }: IListCommentsDTO): Promise<IPaginatedResponse<Comments>> {
    const comments = await this.commentsRepository.listBy({
      filters: {
        userReceiver_id,
      },
      page,
      limit,
    });

    return {
      results: comments.results,
      limit: comments.limit,
      page: comments.page,
      total: comments.total,
    };
  }
}
export { ListCommentService };

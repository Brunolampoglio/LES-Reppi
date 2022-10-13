import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { Repository, getRepository } from 'typeorm';
import { Comments } from '../entities/Comments';
import { ICommentsRepository } from './CommentsRepositories.interface';
import { ICommentCreate } from './dto/CommentsRepositoryDTO';

class CommentRepository implements ICommentsRepository {
  private ormRepository: Repository<Comments>;

  constructor() {
    this.ormRepository = getRepository(Comments);
  }

  async findBy(filter: Partial<Comments>): Promise<Comments | undefined> {
    const comment = await this.ormRepository.findOne(filter);

    return comment;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<Comments>): Promise<IPaginatedResponse<Comments>> {
    const comments = await this.ormRepository.find({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    const commentTotal = await this.ormRepository.count(filters);

    return {
      results: comments,
      total: commentTotal,
      page,
      limit,
    };
  }

  create({
    comment,
    rate,
    userReceiver_id,
    userSender_id,
  }: ICommentCreate): Comments {
    const comments = this.ormRepository.create({
      comment,
      rate,
      userReceiver_id,
      userSender_id,
    });

    return comments;
  }

  async save(comments: Comments): Promise<Comments> {
    const newComments = await this.ormRepository.save(comments);

    return newComments;
  }

  async remove(comments: Comments): Promise<void> {
    await this.ormRepository.remove(comments);
  }
}
export { CommentRepository };

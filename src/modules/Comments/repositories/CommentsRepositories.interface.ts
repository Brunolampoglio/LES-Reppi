import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { Comments } from '../entities/Comments';
import { ICommentCreate } from './dto/CommentsRepositoryDTO';

interface ICommentsRepository {
  findBy(filter: Partial<Comments>): Promise<Comments | undefined>;
  listBy(
    filter: IPaginatedRequest<Comments>,
  ): Promise<IPaginatedResponse<Comments>>;
  create(comments: ICommentCreate): Comments;
  save(comments: Comments): Promise<Comments>;
  remove(comments: Comments): Promise<void>;
}
export { ICommentsRepository };

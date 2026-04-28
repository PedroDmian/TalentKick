import { IComment } from '../models/IComment';
import { IPaginatedResponse } from '../models/IFeed';

export interface CommentRepository {
  getCommentsByFeedId(feedId: string, page: number, limit: number): Promise<IPaginatedResponse<IComment>>;
  createComment(feedId: string, content: string): Promise<IComment>;
  updateComment(id: string, content: string): Promise<IComment>;
  deleteComment(id: string): Promise<void>;
}

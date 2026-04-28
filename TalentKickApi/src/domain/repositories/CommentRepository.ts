import { Comment } from '../entities/Comment';

export interface CommentRepository {
  save(comment: Comment): Promise<Comment>;
  findById(id: string): Promise<Comment | null>;
  findByFeedId(feedId: string, page: number, limit: number): Promise<[Comment[], number]>;
  update(id: string, content: string): Promise<Comment>;
  delete(id: string): Promise<void>;
}

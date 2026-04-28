import { CommentRepository } from '../../domain/repositories/CommentRepository';
import { Comment } from '../../domain/entities/Comment';

export class ListComments {
  constructor(private commentRepository: CommentRepository) {}

  async execute(feedId: string, page: number = 1, limit: number = 20): Promise<[Comment[], number]> {
    return this.commentRepository.findByFeedId(feedId, page, limit);
  }
}

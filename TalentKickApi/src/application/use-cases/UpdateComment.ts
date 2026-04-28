import { CommentRepository } from '../../domain/repositories/CommentRepository';
import { Comment } from '../../domain/entities/Comment';

export class UpdateComment {
  constructor(private commentRepository: CommentRepository) {}

  async execute(id: string, userId: string, content: string): Promise<Comment> {
    const comment = await this.commentRepository.findById(id);

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (comment.userId !== userId) {
      throw new Error('Unauthorized to update this comment');
    }

    return this.commentRepository.update(id, content);
  }
}

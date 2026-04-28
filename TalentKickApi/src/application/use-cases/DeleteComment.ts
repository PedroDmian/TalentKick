import { CommentRepository } from '../../domain/repositories/CommentRepository';

export class DeleteComment {
  constructor(private commentRepository: CommentRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    const comment = await this.commentRepository.findById(id);

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (comment.userId !== userId) {
      throw new Error('Unauthorized to delete this comment');
    }

    await this.commentRepository.delete(id);
  }
}

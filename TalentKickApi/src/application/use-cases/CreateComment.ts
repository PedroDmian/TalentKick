import { CommentRepository } from '../../domain/repositories/CommentRepository';
import { Comment } from '../../domain/entities/Comment';
import { v4 as uuidv4 } from 'uuid';

interface CreateCommentDTO {
  feedId: string;
  userId: string;
  content: string;
}

export class CreateComment {
  constructor(private commentRepository: CommentRepository) {}

  async execute(dto: CreateCommentDTO): Promise<Comment> {
    const comment = new Comment({
      id: uuidv4(),
      feedId: dto.feedId,
      userId: dto.userId,
      content: dto.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.commentRepository.save(comment);
  }
}

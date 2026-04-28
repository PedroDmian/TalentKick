import { Comment, CommentProps } from '../../domain/entities/Comment';
import { UserMapper } from './UserMapper';

export class CommentMapper {
  static toDomain(data: any): Comment {
    const props: CommentProps = {
      id: data.id,
      feedId: data.feedId,
      userId: data.userId,
      content: data.content,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      user: data.user ? UserMapper.toDomain(data.user) : undefined,
    };
    return new Comment(props);
  }
}

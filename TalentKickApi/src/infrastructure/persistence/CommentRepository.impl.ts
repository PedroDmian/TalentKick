import { CommentRepository } from '../../domain/repositories/CommentRepository';
import { Comment } from '../../domain/entities/Comment';
import prisma from '../config/prisma';
import { CommentMapper } from '../mappers/CommentMapper';

export class CommentRepositoryImpl implements CommentRepository {
  async save(comment: Comment): Promise<Comment> {
    const data = await prisma.comment.create({
      data: {
        id: comment.id,
        feedId: comment.feedId,
        userId: comment.userId,
        content: comment.content,
      },
      include: {
        user: true,
      },
    });
    return CommentMapper.toDomain(data);
  }

  async findById(id: string): Promise<Comment | null> {
    const data = await prisma.comment.findFirst({
      where: { id, deletedAt: null },
      include: {
        user: true,
      },
    });
    return data ? CommentMapper.toDomain(data) : null;
  }

  async findByFeedId(feedId: string, page: number, limit: number): Promise<[Comment[], number]> {
    const skip = (page - 1) * limit;
    const [total, data] = await prisma.$transaction([
      prisma.comment.count({ where: { feedId, deletedAt: null } }),
      prisma.comment.findMany({
        where: { feedId, deletedAt: null },
        include: {
          user: true,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'asc',
        },
      }),
    ]);
    return [data.map(CommentMapper.toDomain), total];
  }

  async update(id: string, content: string): Promise<Comment> {
    const data = await prisma.comment.update({
      where: { id },
      data: { content },
      include: {
        user: true,
      },
    });
    return CommentMapper.toDomain(data);
  }

  async delete(id: string): Promise<void> {
    await prisma.comment.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

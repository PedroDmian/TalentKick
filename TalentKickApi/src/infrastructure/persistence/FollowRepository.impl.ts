import { FollowRepository } from '../../domain/repositories/FollowRepository';
import prisma from '../config/prisma';

export class FollowRepositoryImpl implements FollowRepository {
  async follow(followerId: string, followingId: string): Promise<void> {
    await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });
  }

  async unfollow(followerId: string, followingId: string): Promise<void> {
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  }

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
    return !!follow;
  }

  async getFollowersCount(userId: string): Promise<number> {
    return prisma.follow.count({
      where: { followingId: userId },
    });
  }

  async getFollowingCount(userId: string): Promise<number> {
    return prisma.follow.count({
      where: { followerId: userId },
    });
  }
}

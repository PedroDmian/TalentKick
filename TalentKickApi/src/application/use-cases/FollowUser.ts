import { FollowRepository } from '../../domain/repositories/FollowRepository';
import { NotificationRepository } from '../../domain/repositories/NotificationRepository';
import { Notification } from '../../domain/entities/Notification';
import { v4 as uuidv4 } from 'uuid';

export class FollowUser {
  constructor(
    private followRepository: FollowRepository,
    private notificationRepository: NotificationRepository
  ) {}

  async execute(followerId: string, followingId: string): Promise<void> {
    if (followerId === followingId) {
      throw new Error('You cannot follow yourself');
    }

    const alreadyFollowing = await this.followRepository.isFollowing(followerId, followingId);
    if (alreadyFollowing) {
      throw new Error('Already following this user');
    }

    await this.followRepository.follow(followerId, followingId);

    // Crear notificación
    const notification = new Notification({
      id: uuidv4(),
      userId: followingId,
      type: 'follow',
      title: 'Nuevo seguidor',
      message: 'Alguien ha comenzado a seguirte',
      referenceId: followerId,
      isRead: false,
      createdAt: new Date(),
    });

    await this.notificationRepository.save(notification);
  }
}

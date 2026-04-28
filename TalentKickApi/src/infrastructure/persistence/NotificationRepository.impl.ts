import { NotificationRepository } from '../../domain/repositories/NotificationRepository';
import { Notification } from '../../domain/entities/Notification';
import prisma from '../config/prisma';
import { NotificationMapper } from '../mappers/NotificationMapper';

export class NotificationRepositoryImpl implements NotificationRepository {
  async save(notification: Notification): Promise<Notification> {
    const data = await prisma.notification.create({
      data: {
        id: notification.id,
        userId: notification.userId,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        referenceId: notification.referenceId,
      },
    });
    return NotificationMapper.toDomain(data);
  }

  async findById(id: string): Promise<Notification | null> {
    const data = await prisma.notification.findUnique({
      where: { id },
    });
    return data ? NotificationMapper.toDomain(data) : null;
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    const data = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return data.map(NotificationMapper.toDomain);
  }

  async markAsRead(id: string, userId: string): Promise<void> {
    const notification = await prisma.notification.findFirst({
      where: { id, userId },
    });

    if (!notification) {
      throw new Error('Notification not found or unauthorized');
    }

    await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async delete(id: string, userId: string): Promise<void> {
    const notification = await prisma.notification.findFirst({
      where: { id, userId },
    });

    if (!notification) {
      throw new Error('Notification not found or unauthorized');
    }

    await prisma.notification.delete({
      where: { id },
    });
  }
}

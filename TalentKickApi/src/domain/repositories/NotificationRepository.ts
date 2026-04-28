import { Notification } from '../entities/Notification';

export interface NotificationRepository {
  save(notification: Notification): Promise<Notification>;
  findById(id: string): Promise<Notification | null>;
  findByUserId(userId: string): Promise<Notification[]>;
  markAsRead(id: string, userId: string): Promise<void>;
  delete(id: string, userId: string): Promise<void>;
}

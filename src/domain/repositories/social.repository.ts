import { INotification } from '../models/INotification';

export interface SocialRepository {
  followUser(followingId: string): Promise<void>;
  requestConnection(requestedId: string): Promise<void>;
  getNotifications(): Promise<INotification[]>;
  markNotificationAsRead(id: string): Promise<void>;
}

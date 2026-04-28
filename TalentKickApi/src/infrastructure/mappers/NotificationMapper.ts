import { Notification, NotificationProps } from '../../domain/entities/Notification';

export class NotificationMapper {
  static toDomain(data: any): Notification {
    const props: NotificationProps = {
      id: data.id,
      userId: data.userId,
      type: data.type,
      title: data.title,
      message: data.message,
      referenceId: data.referenceId,
      isRead: data.isRead,
      createdAt: data.createdAt,
    };
    return new Notification(props);
  }
}

import { ConnectionRepository } from '../../domain/repositories/ConnectionRepository';
import { UserRepository } from '../../domain/repositories/UserRepository.impl';
import { NotificationRepository } from '../../domain/repositories/NotificationRepository';
import { Notification } from '../../domain/entities/Notification';
import { v4 as uuidv4 } from 'uuid';

export class RequestConnection {
  constructor(
    private connectionRepository: ConnectionRepository,
    private userRepository: UserRepository,
    private notificationRepository: NotificationRepository
  ) {}

  async execute(requesterId: string, requestedId: string): Promise<void> {
    const requester = await this.userRepository.findById(requesterId);
    
    if (!requester || requester.role !== 'recruiter') {
      throw new Error('Only recruiters can initiate connections');
    }

    if (requesterId === requestedId) {
      throw new Error('You cannot connect with yourself');
    }

    const alreadyExists = await this.connectionRepository.exist(requesterId, requestedId);
    if (alreadyExists) {
      throw new Error('Connection request already exists or users are connected');
    }

    await this.connectionRepository.requestConnection(requesterId, requestedId);

    // Notificar al usuario solicitado
    const notification = new Notification({
      id: uuidv4(),
      userId: requestedId,
      type: 'connection_request',
      title: 'Nueva solicitud de contacto',
      message: `${requester.name} quiere contactar contigo`,
      referenceId: requesterId,
      isRead: false,
      createdAt: new Date(),
    });

    await this.notificationRepository.save(notification);
  }
}

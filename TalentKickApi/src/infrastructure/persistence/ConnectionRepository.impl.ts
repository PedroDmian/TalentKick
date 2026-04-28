import { ConnectionRepository } from '../../domain/repositories/ConnectionRepository';
import prisma from '../config/prisma';

export class ConnectionRepositoryImpl implements ConnectionRepository {
  async requestConnection(requesterId: string, requestedId: string): Promise<void> {
    await prisma.connection.create({
      data: {
        requesterId,
        requestedId,
        status: 'pending',
      },
    });
  }

  async updateStatus(id: string, status: 'accepted' | 'rejected'): Promise<void> {
    await prisma.connection.update({
      where: { id },
      data: { status },
    });
  }

  async findById(id: string): Promise<any | null> {
    return prisma.connection.findUnique({
      where: { id },
    });
  }

  async findPendingByUserId(userId: string): Promise<any[]> {
    return prisma.connection.findMany({
      where: {
        requestedId: userId,
        status: 'pending',
      },
      include: {
        requester: true,
      },
    });
  }

  async exist(requesterId: string, requestedId: string): Promise<boolean> {
    const connection = await prisma.connection.findFirst({
      where: {
        OR: [
          { requesterId, requestedId },
          { requesterId: requestedId, requestedId: requesterId },
        ],
      },
    });
    return !!connection;
  }
}

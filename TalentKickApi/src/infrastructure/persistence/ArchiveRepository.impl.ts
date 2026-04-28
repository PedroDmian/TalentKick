import { ArchiveRepositoryImpl } from '../../domain/repositories/ArchiveRepository.impl';
import { Archive } from '../../domain/entities/Archive';
import prisma from '../config/prisma';
import { ArchiveMapper } from '../mappers/FeedMapper'; // Reutilizamos ArchiveMapper

export class ArchiveRepository implements ArchiveRepositoryImpl {
  async save(archive: Archive): Promise<Archive> {
    const data = await prisma.archive.create({
      data: {
        id: archive.id,
        url: archive.url,
        type: archive.type,
        createdBy: archive.createdBy,
        updatedBy: archive.updatedBy,
      },
    });
    return ArchiveMapper.toDomain(data);
  }

  async findById(id: string): Promise<Archive | null> {
    const data = await prisma.archive.findFirst({
      where: { id, deletedAt: null },
    });
    return data ? ArchiveMapper.toDomain(data) : null;
  }

  async delete(id: string): Promise<void> {
    await prisma.archive.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

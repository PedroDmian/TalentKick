import { FeedRepositoryImpl } from '../../domain/repositories/FeedRepository.impl';
import { Feed } from '../../domain/entities/Feed';
import { ArchiveProps } from '../../domain/entities/Archive';
import prisma from '../config/prisma';
import { FeedMapper, ArchiveMapper } from '../mappers/FeedMapper';
import { S3Service } from '../services/S3Service';

export class FeedRepository implements FeedRepositoryImpl {
  private s3Service = new S3Service();

  private async signFeedArchives(feedData: any): Promise<any> {
    if (!feedData.archives) return feedData;

    const signedArchives = await Promise.all(
      feedData.archives.map(async (fa: any) => {
        if (!fa.archive) return fa;
        
        // Extraemos la key de la URL guardada (que es la URL permanente original)
        // y generamos una nueva URL firmada.
        const key = this.s3Service['getKeyFromUrl'](fa.archive.url);
        const signedUrl = await this.s3Service.getSignedUrl(key);
        
        return {
          ...fa,
          archive: {
            ...fa.archive,
            url: signedUrl
          }
        };
      })
    );

    return {
      ...feedData,
      archives: signedArchives
    };
  }

  async save(feed: Feed, archiveData: Array<Partial<ArchiveProps>>): Promise<Feed> {
    const createdFeed = await prisma.feed.create({
      data: {
        id: feed.id,
        userId: feed.userId,
        description: feed.description,
        createdBy: feed.createdBy,
        updatedBy: feed.updatedBy,
        archives: {
          create: archiveData.map(archive => ({
            archive: {
              create: {
                id: archive.id!,
                url: archive.url!,
                type: archive.type!,
                createdBy: archive.createdBy,
              },
            },
          })),
        },
      },
      include: {
        archives: {
          include: {
            archive: true,
          },
        },
      },
    });

    const signedFeed = await this.signFeedArchives(createdFeed);
    return FeedMapper.toDomain(signedFeed);
  }

  async findById(id: string): Promise<Feed | null> {
    const feed = await prisma.feed.findFirst({
      where: { id, deletedAt: null },
      include: {
        archives: {
          include: {
            archive: true,
          },
        },
      },
    });
    
    if (!feed) return null;

    const signedFeed = await this.signFeedArchives(feed);
    return FeedMapper.toDomain(signedFeed);
  }

  async findAll(page: number, limit: number, userId?: string): Promise<[Feed[], number]> {
    const skip = (page - 1) * limit;
    const where = { deletedAt: null, ...(userId ? { userId } : {}) };
    
    const [total, feeds] = await prisma.$transaction([
      prisma.feed.count({ where }),
      prisma.feed.findMany({
        where,
        include: {
          archives: {
            include: {
              archive: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    const signedFeeds = await Promise.all(feeds.map(f => this.signFeedArchives(f)));
    return [signedFeeds.map(FeedMapper.toDomain), total];
  }

  async update(id: string, feed: Partial<Feed>, newArchiveData?: Array<Partial<ArchiveProps>>): Promise<Feed> {
    const feedToUpdate: any = {};
    if (feed.description !== undefined) feedToUpdate.description = feed.description;
    if (feed.updatedBy !== undefined) feedToUpdate.updatedBy = feed.updatedBy;

    const updatedFeed = await prisma.feed.update({
      where: { id },
      data: feedToUpdate,
      include: {
        archives: {
          include: {
            archive: true,
          },
        },
      },
    });

    if (newArchiveData && newArchiveData.length > 0) {
      // Eliminar archivos existentes asociados al feed (soft delete en FeedArchives o eliminar Hard)
      // Por simplicidad, aquí solo añadiremos nuevos. Una implementación real manejaría eliminaciones explícitas.
      // Podríamos eliminar los FeedArchives actuales y recrearlos, o solo añadir nuevos.
      // Para este CRUD, asumimos que si se envían archivos nuevos, se añaden a los existentes.

      // Primero, crear los nuevos Archive y FeedArchives
      const createdArchives = await prisma.$transaction(
        newArchiveData.map(archive => prisma.archive.create({
          data: {
            id: archive.id!,
            url: archive.url!,
            type: archive.type!,
            createdBy: archive.createdBy,
          }
        }))
      );

      // Conectar los nuevos archivos al feed
      await prisma.feedArchives.createMany({
        data: createdArchives.map(archive => ({
          feedId: id,
          archiveId: archive.id,
        })),
      });

      // Recargar el feed con los nuevos archivos
      return this.findById(id) as Promise<Feed>;
    }


    return FeedMapper.toDomain(updatedFeed);
  }

  async delete(id: string): Promise<void> {
    // Soft delete del Feed
    await prisma.feed.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    // Opcional: Soft delete de las entradas en FeedArchives o de los Archives mismos.
    // Por simplicidad, solo desvinculamos el feedarchives o lo dejamos como está.
    // Si queremos "desvincular", podemos soft delete FeedArchives o eliminar las entradas.
    // Aquí no se eliminarán los Archives de S3, solo el registro en la DB.
  }
}

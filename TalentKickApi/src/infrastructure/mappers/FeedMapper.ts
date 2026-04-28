import { Feed, FeedProps } from '../../domain/entities/Feed';
import { Archive, ArchiveProps } from '../../domain/entities/Archive';

export class FeedMapper {
  static toDomain(data: any): Feed {
    const props: FeedProps = {
      id: data.id,
      userId: data.userId,
      description: data.description,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      archives: data.archives?.map((fa: any) => ArchiveMapper.toDomain(fa.archive)), // Mapear archivos si existen
    };
    return new Feed(props);
  }
}

export class ArchiveMapper {
  static toDomain(data: any): Archive {
    const props: ArchiveProps = {
      id: data.id,
      url: data.url,
      type: data.type,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    };
    return new Archive(props);
  }
}

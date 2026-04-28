import { Feed } from '../entities/Feed';
import { ArchiveProps } from '../entities/Archive';

export interface FeedRepositoryImpl {
  save(feed: Feed, archiveData: Array<Partial<ArchiveProps>>): Promise<Feed>;
  findById(id: string): Promise<Feed | null>;
  findAll(page: number, limit: number, userId?: string): Promise<[Feed[], number]>;
  update(id: string, feed: Partial<Feed>, newArchiveData?: Array<Partial<ArchiveProps>>): Promise<Feed>;
  delete(id: string): Promise<void>;
}

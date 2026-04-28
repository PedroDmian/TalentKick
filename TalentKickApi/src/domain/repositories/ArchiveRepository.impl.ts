import { Archive } from '../entities/Archive';

export interface ArchiveRepositoryImpl {
  save(archive: Archive): Promise<Archive>;
  findById(id: string): Promise<Archive | null>;
  delete(id: string): Promise<void>;
}

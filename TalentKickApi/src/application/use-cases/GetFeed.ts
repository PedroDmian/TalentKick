import { Feed } from '../../domain/entities/Feed';
import { FeedRepositoryImpl } from '../../domain/repositories/FeedRepository.impl';

export class GetFeed {
  constructor(private feedRepository: FeedRepositoryImpl) {}

  async execute(id: string): Promise<Feed | null> {
    return await this.feedRepository.findById(id);
  }
}

import { Feed } from '../../domain/entities/Feed';
import { FeedRepositoryImpl } from '../../domain/repositories/FeedRepository.impl';

export class ListFeeds {
  constructor(private feedRepository: FeedRepositoryImpl) {}

  async execute(page: number = 1, limit: number = 10, userId?: string): Promise<[Feed[], number]> {
    return await this.feedRepository.findAll(page, limit, userId);
  }
}

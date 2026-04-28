import { FeedRepository } from '../repositories/feed.repository';
import { IFeed, IPaginatedResponse } from '../models/IFeed';

export class GetFeedsUseCase {
  constructor(private readonly feedRepository: FeedRepository) {}

  async execute(page: number, limit: number, userId?: string): Promise<IPaginatedResponse<IFeed>> {
    return await this.feedRepository.getFeeds(page, limit, userId);
  }
}

import { FeedRepository } from '../repositories/feed.repository';
import { IFeed } from '../models/IFeed';

export class CreateFeedUseCase {
  constructor(private readonly feedRepository: FeedRepository) {}

  async execute(description: string, files: any[]): Promise<IFeed> {
    return this.feedRepository.createFeed(description, files);
  }
}

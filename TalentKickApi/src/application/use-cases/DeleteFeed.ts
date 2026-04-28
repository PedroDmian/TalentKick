import { FeedRepositoryImpl } from '../../domain/repositories/FeedRepository.impl';

export class DeleteFeed {
  constructor(private feedRepository: FeedRepositoryImpl) {}

  async execute(id: string, userId: string): Promise<void> {
    const existingFeed = await this.feedRepository.findById(id);
    if (!existingFeed) {
      throw new Error('Feed not found');
    }

    if (existingFeed.userId !== userId) {
      throw new Error('Unauthorized to delete this feed');
    }

    await this.feedRepository.delete(id);
  }
}

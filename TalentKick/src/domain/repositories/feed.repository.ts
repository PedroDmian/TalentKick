import { IFeed, IPaginatedResponse } from '../models/IFeed';

export interface FeedRepository {
  getFeeds(page: number, limit: number, userId?: string): Promise<IPaginatedResponse<IFeed>>;
  getFeedById(id: string): Promise<IFeed>;
  createFeed(description: string, files: any[]): Promise<IFeed>;
  updateFeed(id: string, description?: string, files?: any[]): Promise<IFeed>;
  deleteFeed(id: string): Promise<void>;
}

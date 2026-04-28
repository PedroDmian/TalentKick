import { FeedRepository } from '../../domain/repositories/feed.repository';
import { IFeed, IPaginatedResponse } from '../../domain/models/IFeed';
import { api } from '../api/api';

export class FeedRepositoryImpl implements FeedRepository {
  async getFeeds(page: number, limit: number, userId?: string): Promise<IPaginatedResponse<IFeed>> {
    const response = await api.get<IPaginatedResponse<IFeed>>('/feeds', {
      params: { page, limit, userId },
    });
    return response.data;
  }

  async getFeedById(id: string): Promise<IFeed> {
    const response = await api.get<IFeed>(`/feeds/${id}`);
    return response.data;
  }

  async createFeed(description: string, files: any[]): Promise<IFeed> {
    const formData = new FormData();
    formData.append('description', description);
    
    files.forEach((file) => {
      // En React Native, el archivo debe ser un objeto con uri, type y name
      formData.append('files', {
        uri: file.uri,
        type: file.type || 'video/mp4',
        name: file.name || 'video.mp4',
      } as any);
    });

    const response = await api.post<IFeed>('/feeds', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data) => data, // Evitar que Axios transforme el FormData
    });
    return response.data;
  }

  async updateFeed(id: string, description?: string, files?: any[]): Promise<IFeed> {
    const formData = new FormData();
    if (description) formData.append('description', description);
    if (files) {
      files.forEach((file) => {
        formData.append('files', file);
      });
    }

    const response = await api.put<IFeed>(`/feeds/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async deleteFeed(id: string): Promise<void> {
    await api.delete(`/feeds/${id}`);
  }
}

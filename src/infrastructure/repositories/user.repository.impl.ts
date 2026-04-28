import { UserRepository } from '../../domain/repositories/user.repository';
import { IUser } from '../../domain/models/IUser';
import { IPaginatedResponse } from '../../domain/models/IFeed';
import { api } from '../api/api';

export class UserRepositoryImpl implements UserRepository {
  async getUsers(page: number, limit: number): Promise<IPaginatedResponse<IUser>> {
    const response = await api.get('/users', { params: { page, limit } });
    return response.data;
  }

  async getUserById(id: string): Promise<IUser> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }

  async updateUser(id: string, userData: Partial<IUser>): Promise<IUser> {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  }

  async updateAvatar(userId: string, imageUri: string): Promise<string> {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    } as any);

    const response = await api.post(`/users/${userId}/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    
    return response.data.avatar;
  }

  async addGalleryImage(userId: string, imageUri: string): Promise<any> {
    const formData = new FormData();
    formData.append('files', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'gallery_item.jpg',
    } as any);

    const response = await api.post(`/users/${userId}/gallery`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    
    return response.data;
  }
}

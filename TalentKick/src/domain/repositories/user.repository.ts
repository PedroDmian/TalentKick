import { IUser } from '../models/IUser';
import { IPaginatedResponse } from '../models/IFeed';

export interface UserRepository {
  getUsers(page: number, limit: number): Promise<IPaginatedResponse<IUser>>;
  getUserById(id: string): Promise<IUser>;
  updateUser(id: string, userData: Partial<IUser>): Promise<IUser>;
  deleteUser(id: string): Promise<void>;
  updateAvatar(userId: string, imageUri: string): Promise<string>;
  addGalleryImage(userId: string, imageUri: string): Promise<any>;
}

import { IArchive } from './IArchive';

export interface IUser {
  id: string;
  name: string;
  lastname: string;
  bio?: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'recruiter' | 'user';
  birthdate?: string;
  sessionType?: 'email' | 'google' | 'apple';
  createdAt: string;
  updatedAt: string;
  gallery?: IArchive[];
}

export interface AuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

import { IUser } from './IUser';
import { IArchive } from './IArchive';

export interface IFeed {
  id: string;
  description?: string;
  archives?: IArchive[];
  userId: string;
  user?: IUser;
  createdAt: string;
  updatedAt: string;
  _count?: {
    comments: number;
  };
}

export interface IPaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

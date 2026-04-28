import { IUser } from './IUser';

export interface IComment {
  id: string;
  content: string;
  userId: string;
  feedId: string;
  user?: IUser;
  createdAt: string;
  updatedAt: string;
}

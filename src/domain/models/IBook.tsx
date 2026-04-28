export interface IBook {
  id: string;
  title: string;
  description?: string;
  author: string;
  image: string;
  history?: string;
  progress?: number;
  rating?: number;
  isFavorite?: boolean;
  isRead?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  chapters?: IChapter[];
}

export interface IChapter {
  id: string;
  bookId: string;
  title: string;
  content: string;
  order: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | null;
}

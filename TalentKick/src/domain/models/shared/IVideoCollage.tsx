export interface IVideoCollageProps {
  item: IVideoCollageItem;
  onPress?: () => void;
}

export interface IVideoCollageItem {
  id: string;
  clip: string;
  thumbnail?: string;
  description?: string;
  username?: string;
  userAvatar?: string;
  userRole?: string;
  createdAt?: string;
}
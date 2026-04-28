export interface ICoverVideoProps {
  id: string;
  clip: string;
  image?: string;
  avatar?: string;
  username?: string;
  title: string;
  subtitle?: string;
  rating?: number;
  classStyle?: ICoverVideoStyleProps;
  onPress?: (id: string) => void;
  onPressFavorite?: (id: string) => void;
}

export interface ICoverVideoStyleProps {
  classNameContainer?: string;
  classNameImage?: string;
  classNameTitle?: string;
  classNameSubtitle?: string;
  classNameRating?: string;
}
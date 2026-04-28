export interface ICoverProps {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  rating?: number;
  classStyle?: ICoverStyleProps;
  onPress?: (id: string) => void;
  onPressFavorite?: (id: string) => void;
}

export interface ICoverStyleProps {
  classNameContainer?: string;
  classNameImage?: string;
  classNameTitle?: string;
  classNameSubtitle?: string;
  classNameRating?: string;
}
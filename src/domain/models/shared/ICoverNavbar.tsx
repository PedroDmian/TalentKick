export interface ICoverNavbarProps {
  onPressFavorite: () => void;
  onPressRead: () => void;
  title: string;
  iconFavorite?: React.ReactNode;
  iconRead?: React.ReactNode;
  classStyle?: ICoverNavbarStyleProps;
  progress?: number;
}

export interface ICoverNavbarStyleProps {
  classNameContainer?: string;
  classNameRead?: string;
  classNameFavorite?: string;
}

export interface ICoverHeader {
  id: string;
  image: string;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  classStyle?: ICoverHeaderStyleProps;
}

export interface ICoverHeaderStyleProps {
  classNameContainer?: string;
}
import { ReactNode } from "react";
import { KeyboardTypeOptions, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

export interface IInputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'number';
  maxLength?: number;
  value?: string | number;
  error?: string;
  placeHolderTextColor?: string;
  classStyle?: IInputStyled;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (value: string) => void;
  editable?: boolean;
  onPress?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

export interface IInputStyled {
  classNameContainer?: string;
  classNameLabel?: string;
  classNameInputContainer?: string;
  classNameInput?: string;
  classNameError?: string;
}

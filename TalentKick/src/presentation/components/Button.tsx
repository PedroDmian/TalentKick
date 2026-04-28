import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { IButtonProps } from '../../domain/models/shared/IButton';

const Button = ({
  title,
  icon,
  onPress,
  styleType,
  classNameTouch,
  element,
  activeOpacity = 0.7,
  isLoading
}: IButtonProps) => {
  const buttonStyles = {
    dark: {
      touch: 'bg-dark',
      text: 'text-white',
      classNameTouch: classNameTouch ?? 'py-5 px-5'
    },
    light: {
      touch: 'bg-white',
      text: 'text-dark',
      classNameTouch: classNameTouch ?? 'py-5 px-5'
    },
    primary: {
      touch: 'bg-yellow',
      text: 'text-white',
      classNameTouch: classNameTouch ?? 'py-5 px-5'
    },
    secondary: {
      touch: 'bg-gray-500',
      text: 'text-white',
      classNameTouch: classNameTouch ?? 'py-5 px-5'
    },
    danger: {
      touch: 'bg-red-500',
      text: 'text-white',
      classNameTouch: classNameTouch ?? 'py-5 px-5'
    },
    success: {
      touch: 'bg-green-500',
      text: 'text-white',
      classNameTouch: classNameTouch ?? 'py-5 px-5'
    },
    warning: {
      touch: 'bg-yellow-500',
      text: 'text-black',
      classNameTouch: classNameTouch ?? 'py-5 px-5'
    },
    info: {
      touch: 'bg-cyan-500',
      text: 'text-white',
      classNameTouch: classNameTouch ?? 'py-5 px-5'
    },
    link: {
      touch: 'bg-transparent',
      text: 'text-dark',
      classNameTouch: classNameTouch ?? ''
    },
    disabled: {
      touch: 'py-5 px-5 bg-gray-300',
      text: 'text-gray-500',
      classNameTouch: classNameTouch ?? ''
    },
    transparent: {
      touch: 'bg-transparent',
      text: 'text-dark',
      classNameTouch: classNameTouch ?? ''
    },
    border: {
      touch: 'border border-silver',
      text: 'text-silver font-monaMedium',
      classNameTouch: classNameTouch ?? 'py-5 px-5'
    }
  }

  const buttonStyle = buttonStyles[styleType || 'dark'].touch;
  const textStyle = buttonStyles[styleType || 'dark'].text
  const classNameTouchStyle = buttonStyles[styleType || 'dark'].classNameTouch;

  return (
    <TouchableOpacity activeOpacity={activeOpacity} className={`${ buttonStyle } rounded-2xl ${classNameTouchStyle ?? ''}`} onPress={onPress}>
      <View className="flex flex-row justify-center items-center gap-2">
        {icon && <>{icon}</>}

        { title && <Text className={`${textStyle} text-center font-monaBold tracking-wide text-base`}>{title}</Text> }
      </View>

      {element && <View className='relative justify-center w-full items-center'>{element}</View>}
    </TouchableOpacity>
  );
}

export default Button;
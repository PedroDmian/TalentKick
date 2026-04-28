import {
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";

import { IInputProps } from "../../domain/models/shared/IInput";

const Input = ({
  label,
  placeholder,
  type = 'text',
  maxLength = 500,
  value,
  error = '',
  icon,
  rightIcon,
  placeHolderTextColor = '#6c757d',
  onChangeText,
  classStyle,
  secureTextEntry,
  autoCapitalize,
  keyboardType,
  editable = true,
  onPress,
  multiline = false,
  numberOfLines = 1,
  onBlur
}: IInputProps) => {
  const classNameContainer = classStyle?.classNameContainer ?? '';
  const classNameLabel = classStyle?.classNameLabel ?? 'ms-1 text-dark text-base font-monaMedium mb-2';
  const classNameInputContainer = classStyle?.classNameInputContainer;
  const classNameInput = classStyle?.classNameInput ?? 'text-dark text-base font-monaRegular';
  const classNameError = classStyle?.classNameError ?? 'ms-1 text-danger text-base mt-1';

  const InputComponent = (
    <View className={`w-full ${classNameContainer}`}>
      { label && 
        <Text className={`${classNameLabel}`}>
          {label}
        </Text>
      }

      <View className={`
        flex-row
        items-center
        justify-start
        relative
        bg-timberwolf
        rounded-full
        px-4
        container-input
        ${classNameInputContainer}
        border
        border-solid
        ${error ? 'border-danger' : 'border-transparent'}
        ${!editable ? 'opacity-80' : ''}
      `}>
        { icon &&
          <View className="mb-1">
            {icon}
          </View>
        }

        <TextInput
          placeholder={placeholder || ''}
          keyboardType={keyboardType || (type === 'number' ? 'number-pad' : 'default')}
          maxLength={maxLength || 500}
          placeholderTextColor={placeHolderTextColor}
          onChangeText={onChangeText}
          value={value !== undefined && value !== null ? String(value) : ''}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          editable={onPress ? false : editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onBlur={onBlur}
          pointerEvents={onPress ? 'none' : 'auto'}
          className={`${classNameInput} flex-1 pb-2 h-full flex items-center ${icon ? 'ps-2' : 'ps-2'} ${rightIcon ? 'pe-2' : ''}`}
          style={multiline ? { textAlignVertical: 'top', paddingTop: 10 } : {}}
        />

        { rightIcon &&
          <View className="mb-1">
            {rightIcon}
          </View>
        }
      </View>
      

      { error && <Text className={`${classNameError}`}>{error}</Text> }
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} className="w-full">
        {InputComponent}
      </TouchableOpacity>
    );
  }

  return InputComponent;
}

export default Input;

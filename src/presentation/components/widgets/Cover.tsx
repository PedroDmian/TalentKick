import {
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';

import { ICoverProps } from '../../../domain/models/shared/ICover';

const styles = StyleSheet.create({
  container: { height: 250 }
});

const Cover = ({
  id,
  image,
  classStyle,
  onPress,
  onPressFavorite
}: ICoverProps) => {
  return (
    <View className='
      rounded-lg
      relative
      mr-3
      w-48
      overflow-hidden
    '
    style={styles.container}
    >
      <TouchableOpacity 
        activeOpacity={1}
        onPress={() => onPress && onPress(id)}
      >
        <Animated.Image
          source={{ uri: image }}
          className={`w-full h-full ${classStyle?.classNameImage || ''}`} 
          resizeMode={'stretch'}
          sharedTransitionTag={`cover-image-${id}`}
        />

        <View className={`absolute top-0 right-0`}>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => onPressFavorite && onPressFavorite(id)}
          >
            <Icon
              name='heart'
              size={25}
              color={`white`}
              className='p-2'
            />
          </TouchableOpacity>
        </View>

      </TouchableOpacity>
    </View>
  );
}

export default Cover;
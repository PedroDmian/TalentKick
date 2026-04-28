import { View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

import { ICoverHeader } from '../../../domain/models/shared/ICoverHeader';

const styles = StyleSheet.create({
  gradientTop: { 
    height: 150,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1
  },
  gradientBottom: { 
    height: 200,
    width: '100%',
    position: 'absolute',
    bottom: 0
  }
});

const CoverHeader = ({
  id,
  image,
  resizeMode = 'cover',
  classStyle
}: ICoverHeader) => {
  const classNameContainer = classStyle?.classNameContainer || '';

  return (
    <View className={`
      relative
      top-0
      left-0
      right-0
      h-96
      bg-dark
      overflow-hidden
      ${classNameContainer}
    `}>
       <LinearGradient
        colors={['rgba(0,0,0, 1)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradientTop}
      />

      <Animated.Image
        source={{ uri: image }}
        sharedTransitionTag={`book-image-${id}`}
        className={'left-0 right-0 h-full w-full'}
        resizeMode={resizeMode}
      />

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradientBottom}
      />
    </View>
  );
}

export default CoverHeader;
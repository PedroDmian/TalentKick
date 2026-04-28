import {
  View,
  Animated,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IProfileHeaderProps } from '../../domain/models/shared/IProfile';

const ProfileHeader = ({
  image,
  opacity,
  classStyle
}: IProfileHeaderProps) => {
  const classNameContainer = classStyle?.classNameContainer ?? '';
  const classNameImage = classStyle?.classNameImage ?? 'w-full h-full';
  const classNameLinearGradient = classStyle?.classNameLinearGradient ?? '';

  return (
    <View className={`
        absolute
        top-0
        left-0
        right-0
        h-1/2
        bg-dark
        overflow-hidden
        ${classNameContainer}
      `}
      style={styles.container}
    >
      <Animated.Image
        source={{ uri: image }}
        className={`left-0 right-0 h-full w-full ${classNameImage}`}
        resizeMode={'cover'}
        style={{
          opacity
        }}
      />

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className={classNameLinearGradient}
        style={styles.gradient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 450
  },
  gradient: { 
    height: 210,
    width: '100%',
    position: 'absolute',
    bottom: 0
  }
});

export default ProfileHeader;
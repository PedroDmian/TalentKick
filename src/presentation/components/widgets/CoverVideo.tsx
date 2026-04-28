import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Video from 'react-native-video';

import { ICoverVideoProps } from '../../../domain/models/shared/ICoverVideo';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: { height: 250 },
  video: { width: "100%", height: "100%" },
  gradient: { 
    height: 70,
    width: '100%',
    position: 'absolute',
    bottom: -25
  }
});

const CoverVideo = ({
  id,
  clip,
  image,
  avatar,
  username,
  classStyle,
  onPress,
  onPressFavorite
}: ICoverVideoProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hideImage, setHideImage] = useState(false);

  const opacity = useSharedValue(1);

  const handlePlayVideo = () => {
    setIsPlaying(true);

    if (isVideoLoaded) {
      opacity.value = withTiming(0, { duration: 350 }, (finished) => {
        if (finished) runOnJS(setHideImage)(true);
      });
    }
  };

  const onVideoLoad = () => {
    setIsVideoLoaded(true);

    if (isPlaying) {
      opacity.value = withTiming(0, { duration: 350 }, (finished) => {
        if (finished) runOnJS(setHideImage)(true);
      });
    }
  };

  const animatedImageStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

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
        onPress={() => {
          if (onPress) {
            onPress(id);
          }

          handlePlayVideo();
        }}
      >
        { image && !hideImage && (
          <Animated.Image
            source={{ uri: image }}
            className={`w-full h-full absolute ${classStyle?.classNameImage || ""}`}
            style={animatedImageStyle}
            resizeMode="cover"
          />
        )}

        { clip &&
            <Video
              source={{ uri: clip }}
              repeat={false}
              paused={!isPlaying}
              muted
              controls={false}
              style={styles.video}
              resizeMode={'cover'}
              onLoad={onVideoLoad}
            />
        }

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

        <View className={`absolute top-2 left-2`}>
          <Image
            source={{
              uri: avatar
            }}
            className="w-10 h-10 rounded-full"
            resizeMode='cover'
          />
        </View>

        { !isPlaying &&
          <View className='absolute top-0 left-0 right-0 bottom-0 justify-center items-center'>
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={handlePlayVideo}
            >
              <Icon
                name='play-circle'
                size={25}
                color={`white`}
                className='p-2'
              />
            </TouchableOpacity>
          </View>
        }

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        />

        <View className='absolute bottom-0 left-0 p-2 w-full'>
          <Text className={`text-white text-lg font-monaBold ${classStyle?.classNameTitle || ''}`}>
            { username }
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default CoverVideo;
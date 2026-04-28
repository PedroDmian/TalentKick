import React from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const TAB_WIDTH = width / 5;

interface Props {
  setCurrentScreen: (value: string) => void;
}

const NavBar = ({ setCurrentScreen }: Props) => {
  const circleX = useSharedValue(TAB_WIDTH / 2);
  const circleOpacity = useSharedValue(1);

  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(circleX.value - 7, { duration: 300 }) }],
      opacity: withTiming(circleOpacity.value, { duration: 300 }),
    };
  });

  const onPress = (index: number, screen: string) => {
    circleX.value = TAB_WIDTH * index + TAB_WIDTH / 2;
    circleOpacity.value = index === 3 ? 0 : 1;

    setCurrentScreen(screen);
  };

  return (
    <View className='absolute bottom-8 left-0 right-0 z-20 bg-orange flex-row justify-between items-center px-10 py-0 mx-4 rounded-full'>
      <TouchableOpacity activeOpacity={0.9} key={0} onPress={() => onPress(0, 'HomeScreen')} className="justify-center items-center rounded-full p-3">
        <Image
          source={require("../../assets/icons/home.png")}
          className="w-7 h-7"
        />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.9} key={1} onPress={() => onPress(1, 'NotificationsScreen')} className="justify-center items-center p-3">
        <Image
          source={require("../../assets/icons/notifications.png")}
          className="w-7 h-7"
        />

      </TouchableOpacity>
      
      <TouchableOpacity activeOpacity={0.9} key={2} onPress={() => onPress(2, 'FeedCreateScreen')} className="justify-center items-center p-3">
        <Image
          source={require("../../assets/icons/video-1.png")}
          className="w-7 h-7"
        />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.9} key={3} onPress={() => onPress(3, 'ProfileScreen')} className="justify-center items-center p-3">
        <Image
          source={{
            uri: 'https://media.licdn.com/dms/image/v2/C4E03AQHEehiqMjU9rA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1641947909491?e=2147483647&v=beta&t=Ea78WweykaTvi6bRNVDejqE6gZXOkuVjv3hbJUhBoDk'
          }}
          className="w-14 h-14 rounded-full"
          resizeMode='cover'
        />
      </TouchableOpacity>

      <Animated.View
        className="active-nav absolute"
        style={[
          styles.activeCircle,
          animatedCircleStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  activeCircle: {
    width: 45,
    height: 45,
    zIndex: -1,
  },
});

export default NavBar;
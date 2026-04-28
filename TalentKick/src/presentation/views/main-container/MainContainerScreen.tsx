import { useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

// ? Navigation Root
import { RootStackParamsList } from '../../../../App';

// ? Component
import NavBar from '../../components/Navbar';

// ? Screen Primary Imports
import HomeScreen from '../home/HomeScreen';
import NotificationScreen from '../notification/NotificationScreen';
import FeedCreateScreen from '../feed-create/FeedCreateScreen';
import ProfileScreen from '../profile/ProfileScreen';

const {
  width,
  height
} = Dimensions.get("window");

interface Props extends StackScreenProps<RootStackParamsList, 'MainContainerScreen'> {}

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeAreaViewRender = ({ children, currentScreen }: { children: React.ReactNode, currentScreen: string }) => {
  const insets = useSafeAreaInsets();
  
  const contentViewSafeAreaActive: { [key: string]: boolean } = {
    HomeScreen: true,
    NotificationsScreen: true,
    FeedCreateScreen: true,
    ProfileScreen: false,
  };

  const isSafeAreaActive = contentViewSafeAreaActive[currentScreen];

  return (
    <View 
      className='flex-1'
      style={{ 
        paddingTop: isSafeAreaActive ? insets.top : 0,
        paddingLeft: isSafeAreaActive ? 16 : 0,
        paddingRight: isSafeAreaActive ? 16 : 0,
      }}
    >
      {children}
    </View>
  );
};

const MainContainerScreen = ({ navigation, route }: Props) => {
  const pageDefault = (route.params as any)?.pageDefault;
  const [currentScreen, setCurrentScreen] = useState<string>(pageDefault || 'HomeScreen');

  const scale = useSharedValue(0);
  const opacityOverlay = useSharedValue(0);

  const [animating, setAnimating] = useState(false);

  const circleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityOverlay.value,
    };
  });

  const changeScreen = (target: string) => {
    if (animating || target === currentScreen) return;

    setAnimating(true);

    opacityOverlay.value = withTiming(1, { duration: 150 });

    scale.value = withTiming(10, { duration: 300 }, () => {
      runOnJS(setCurrentScreen)(target);

      scale.value = withTiming(0, { duration: 300 });

      opacityOverlay.value = withTiming(0, { duration: 200 }, () => {
        runOnJS(setAnimating)(false);
      });
    });
  };
  
  const renderScreen = () => {
    switch (currentScreen) {
      case 'HomeScreen':
        return <HomeScreen navigation={navigation} route={route} />;
      case 'NotificationsScreen':
        return <NotificationScreen />;
      case 'FeedCreateScreen':
        return <FeedCreateScreen />;
      case 'ProfileScreen':
        return <ProfileScreen />;
      default:
        return null;
    }
  };

  return (
    <View className='flex-1 bg-salt relative'>
      <Image
        source={require('../../../assets/icons/waves-opacity-black.png')}
        className='w-full absolute top-0 left-0 right-0 h-250 z-1 opacity-15'
        resizeMode='stretch'
      />

      <SafeAreaViewRender currentScreen={currentScreen}>
        { renderScreen() }
      </SafeAreaViewRender>

      {animating && (<>
          <Animated.View style={[
            styles.circle,
            circleStyle
          ]} className='bg-slate-50'/>

          <Animated.View className='flex-1 justify-center items-center' style={[styles.innerContainer, overlayStyle]}>
            <Image
              source={require("../../../assets/icons/logo.png")}
              className='w-60'
              resizeMode="contain"
            />
          </Animated.View>
        </>
      )}
      
      <NavBar
        setCurrentScreen={changeScreen}
      />
    </View>
  );
}

const CIRCLE_SIZE = Math.sqrt(width ** 2 + height ** 2) * 2;

const styles = StyleSheet.create({
  circle: {
    position: "absolute",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    top: height / 2 - CIRCLE_SIZE / 2,
    left: width / 2 - CIRCLE_SIZE / 2,
    zIndex: 19,
  },
  innerContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    transform: [
      { scale: 1 }
    ]
  },
});

export default MainContainerScreen;
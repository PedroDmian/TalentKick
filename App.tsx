import './src/assets/styles/global.css';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { ToastProvider } from 'tostadin-rn';

// ? Store
import { useAuthStore } from './src/presentation/store/useAuthStore';

// ? Screens Pages
import SignUpScreen from './src/presentation/views/sign-up/SignUpScreen';
import RegisterScreen from './src/presentation/views/sign-up/RegisterScreen';
import MainContainerScreen from './src/presentation/views/main-container/MainContainerScreen';
import BookScreen from './src/presentation/views/book/BookScreen';
import BookChaptersScreen from './src/presentation/views/book/BookChaptersScreen';
import ChapterScreen from './src/presentation/views/book/ChapterScreen';

import {
  IBook,
  IChapter
} from './src/domain/models/IBook';
import VideoSinglerScreen from './src/presentation/views/video-singler/VideoSinglerScreen';

export type RootStackParamsList = {
  SignUpScreen: undefined;
  RegisterScreen: undefined;
  LoginScreen: undefined;
  MainContainerScreen: { pageDefault?: string } | undefined;
  BookScreen: { id: string } | undefined;
  BookChaptersScreen: IBook | undefined;
  ChapterScreen: IChapter | undefined;
  VideoSinglerScreen: undefined;
};

enableScreens(true);

// ? Navigation
const Stack = createNativeStackNavigator<RootStackParamsList>();

import { DependenciesProvider } from './src/presentation/context/DependenciesContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <QueryClientProvider client={queryClient}>
      <DependenciesProvider>
        <ToastProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
              // Auth Flow
              <>
                <Stack.Screen name="MainContainerScreen" component={MainContainerScreen} />
                <Stack.Screen 
                  name="BookScreen" 
                  component={BookScreen}
                  options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animation: 'fade',
                  }}
                />
                <Stack.Screen 
                  name="BookChaptersScreen" 
                  component={BookChaptersScreen}
                  options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animation: 'fade',
                  }}
                />
                <Stack.Screen 
                  name="ChapterScreen" 
                  component={ChapterScreen}
                  options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animation: 'fade',
                  }}
                />
                <Stack.Screen 
                  name="VideoSinglerScreen" 
                  component={VideoSinglerScreen}
                  options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animation: 'fade',
                  }}
                />
              </>
            ) : (
              // Non-Auth Flow
              <>
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              </>
            )}
            </Stack.Navigator>
          </NavigationContainer>
        </ToastProvider>
      </DependenciesProvider>
    </QueryClientProvider>
  );
}
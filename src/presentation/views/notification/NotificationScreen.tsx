import { useState } from 'react';
import {
  Text,
  View,
  RefreshControl,
  Image,
  StyleSheet
} from 'react-native';
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';

const NotificationScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = async () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <KeyboardAwareScrollView
      bounces={true}
      keyboardShouldPersistTaps={'never'}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className='flex-1 justify-start items-center'>
        <Text className='text-dark text-4xl mt-5 font-monaExtraBold tracking-widest'>
          Notificaciones
        </Text>
        <View className='flex-1 justify-center'>
          <Image
            source={require('../../../assets/icons/empty-notifications.png')}
            className='h-80'
            resizeMode={'contain'}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default NotificationScreen;
import { Text, View } from 'react-native';

const HeaderAction = () => {
  return (
    <View className='flex-1 bg-white justify-center items-center'>
      <Text className='text-dark text-4xl font-monaExtraBold tracking-widest'>
        Main Container Screen
      </Text>
      <Text className='text-dark text-2xl font-mona mt-2'>
        This is the main container screen.
      </Text>
    </View>
  );
}

export default HeaderAction;
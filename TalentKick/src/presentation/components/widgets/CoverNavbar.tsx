import { Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Button from '../Button';

import { ICoverNavbarProps } from '../../../domain/models/shared/ICoverNavbar';

const styles = StyleSheet.create({
  gradient: { 
    height: 130,
    width: '100%',
    position: 'absolute',
    bottom: -25
  }
});

const CoverNavbar = ({
  onPressFavorite,
  onPressRead,
  title,
  iconFavorite,
  iconRead,
  classStyle,
  progress = 0
}: ICoverNavbarProps) => {
  const classNameContainer = classStyle?.classNameContainer || '';
  const classNameRead = classStyle?.classNameRead || '';
  const classNameFavorite = classStyle?.classNameFavorite || '';

  return (
    <View className={`absolute bottom-7 left-0 right-0 z-20 flex-row justify-between items-center py-0 mx-4 rounded-full ${classNameContainer}`}>
      <View className='flex-row items-center w-full px-4 z-10'>
        <Button
          activeOpacity={0.9}
          icon={iconFavorite}
          onPress={onPressFavorite}
          styleType={'dark'}
          classNameTouch={`py-5 px-5 ${classNameFavorite}`}
        />

        <Button
          activeOpacity={0.9}
          title={title}
          icon={iconRead}
          onPress={onPressRead}
          classNameTouch={`flex-1 ml-4 py-5 px-5 ${classNameRead}`}
          styleType={'light'}
          element={
            progress > 0 && <View className='bg-silver rounded-full w-3/4 h-1 mt-2 z-10 absolute -bottom-3'>
              <View className='h-1 bg-dark rounded-full' style={{
                width: `${progress}%`
              }} />
              
              <Text className='absolute -bottom-1 text-eerie font-mona text-sm -right-10'>{progress} %</Text>
            </View> 
          }
        />
      </View>

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    </View>
  );
}

export default CoverNavbar;
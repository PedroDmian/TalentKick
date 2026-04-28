import {
  View,
  StyleSheet
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { INavigationProps } from '../../../domain/models/INavigation';
import { IBook } from '../../../domain/models/IBook';

import CoverHeader from '../../components/widgets/CoverHeader';
import Button from '../../components/Button';
import BookChapters from '../../components/modules/BookChapters';

const styles = StyleSheet.create({
  container: { flexGrow: 1, width: '100%' }
});

const coverHeaderClassStyle = { classNameContainer: 'h-1/4' };

const BookChaptersScreen = ({ navigation, route }: INavigationProps) => {
  const insets = useSafeAreaInsets();
  const {
      id,
      image,
      title,
      description,
      history,
      author,
    } = route.params as IBook;
    
  return (
    <View className='flex-1 bg-dark justify-start w-full'>
      <KeyboardAwareScrollView
        bounces={false}
        keyboardShouldPersistTaps={'never'}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View 
          className='absolute left-5 z-10' 
          style={{ top: Math.max(insets.top, 20) }}
        >
          <Button
            icon={<IconFontAwesome5 name='chevron-left' size={25} color={'white'}/>}
            onPress={() => navigation.goBack()}
            styleType={'trasparent'}
            classNameTouch='px-2 py-1'
          />
        </View>

        <CoverHeader 
          id={id} 
          image={image}
          classStyle={coverHeaderClassStyle}
        />
        
        <View className='w-full h-full flex-1'>
          <BookChapters 
            title={title}
            description={description}
            history={history}
            author={author}
            image={image}
            id={id}
            onPressRead={(chapterId) => navigation.navigate('ChapterScreen', {
                id: chapterId,
              })
            }
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default BookChaptersScreen;
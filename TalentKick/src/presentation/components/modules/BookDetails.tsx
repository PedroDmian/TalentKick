import { Text, View } from 'react-native';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import { IBook } from '../../../domain/models/IBook';

import CoverBadges from '../widgets/CoverBadges';

const BookDetails = (entityBook: IBook) => {
  return (
    <View 
      className='relative -top-10 left-0 right-0 w-full p-4 rounded-t-3xl mb-10'
    >
      <Text className='text-yellow text-sm font-monaMedium tracking-widest mb-3'>
        By {entityBook.author}
      </Text>

      <Text className='text-white text-4xl font-monaExtraBold tracking-widest'>
        {entityBook.title}
      </Text>

      <Text className='text-davygray text-sm font-monaMedium tracking-widest mb-1'>
        {entityBook.description}
      </Text>

      <View className='flex-row justify-start items-center mt-2'>
        <CoverBadges 
          title={`300`} 
          icon={<IconFontAwesome5 name='book-open' size={15} color={'white'} />}
        />
        
        <CoverBadges 
          title={`4.5`} 
          icon={<IconFontAwesome name='star' size={15} color={'white'} />}
        />
      </View>

      <Text className='text-salt text-xl font-mona mt-5'>
        { entityBook.history }
      </Text>
    </View>
  );
}

export default BookDetails;
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Input from './Input';

export interface Props {
  search: string;
  setSearch: (value: string) => void;
}

const Search = ({
  search,
  setSearch,
}: Props) => {
  return (
    <View className='mt-7 w-full'>
      <Input
        icon={<Icon name='search' size={20} color={'#5C5C5C'} />}
        placeholder='Search...'
        type='text'
        maxLength={500}
        placeHolderTextColor='#5C5C5C'
        value={search}
        error=''
        onChangeText={(value) => setSearch(value)}
      />
    </View>
  );
}

export default Search;

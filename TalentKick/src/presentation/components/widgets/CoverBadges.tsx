import { Text, View } from 'react-native';

import { ICoverBadges } from '../../../domain/models/shared/ICoverBadges';

const CoverBadges = ({
  title,
  icon
}: ICoverBadges) => {
  return (
    <View className='flex flex-row items-center align-center gap-2 mr-4'>
      <Text className='text-salt text-base'>{ title }</Text>
      {icon && <>{icon}</>}
    </View>
  );
}

export default CoverBadges;
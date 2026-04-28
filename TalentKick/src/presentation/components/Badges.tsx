import { Animated, Text } from 'react-native';

import { IBodgesProps } from '../../domain/models/shared/IBadges';
import { useEffect, useRef } from 'react';

const Badges = ({
  title,
  classStyle,
  isActive = false
}: IBodgesProps & { isActive?: Boolean }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isActive ? 1.1 : 1,
      useNativeDriver: true,
      friction: 5,
    }).start();
  }, [isActive, scaleAnim]);

  const classNameContainer = classStyle?.classNameContainer || 'bg-trasnparent';
  const classNameText = classStyle?.classNameText || 'text-eerie'

  return (
    <Animated.View
      style={{ 
        transform: [
          { scale: scaleAnim }
        ] 
      }}
      className={`${classNameContainer} rounded-full px-3 py-2 m-1`}
    >
      <Text className={`${classNameText} font-mona text-base text-center`}>{title}</Text>
    </Animated.View>
  );
}

export default Badges;
import { useState } from 'react';
import {
  LayoutChangeEvent,
  ScrollView,
  View,
  ViewProps
} from 'react-native';

type CarouselProps = {
  children: React.ReactNode;
} & ViewProps;

const Carousel = ({ children, ...props }: CarouselProps) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    
    setContainerWidth(width);
  };

  return (
    <View onLayout={handleLayout}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={contentWidth > containerWidth}
        onContentSizeChange={(w) => setContentWidth(w)}
        {...props}
      >
        {children}
      </ScrollView>
    </View>
  );
}

export default Carousel;
import { Dimensions, FlatList, View, StyleSheet } from 'react-native';
import { useRef, useState } from 'react';
import Video from 'react-native-video';

import { INavigationProps } from '../../../domain/models/INavigation';

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const VideoSinglerScreen = ({ navigation, route }: INavigationProps) => {
  const { videos, startIndex } = route.params as { videos: { id: number; clip: string }[]; startIndex: number; };
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  return (
    <FlatList
      ref={flatListRef}
      data={videos}
      pagingEnabled
      initialScrollIndex={startIndex}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={{ viewAreaCoveragePercentThreshold: 80 }}
      keyExtractor={(item) => item.id.toString()}
      decelerationRate="fast"
      renderItem={({ item, index }) => (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: item.clip }}
            style={styles.video}
            resizeMode={'cover'}
            repeat
            paused={currentIndex !== index}
            onEnd={() => {
              const nextIndex = index + 1;
  
              if (nextIndex >= videos.length) {
                navigation.goBack();
                return;
              }

              flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
              });
            }}
          />
        </View>
      )}
      getItemLayout={(_data, index) => ({
        length: SCREEN_HEIGHT,
        offset: SCREEN_HEIGHT * index,
        index,
      })}
      onScroll={(e) => {
        if (e.nativeEvent.contentOffset.y < -30) {
          navigation.goBack();
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    height: SCREEN_HEIGHT,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});

export default VideoSinglerScreen;
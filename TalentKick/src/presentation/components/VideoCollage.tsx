import React, { useState } from "react";
import {
  Text,
  View
} from "react-native";

import VideoCollageItem from "./widgets/VideoCollageItem";

const VideoCollage = ({
  navigation
}: { navigation: any }) => {
  const [videos] = useState([
    {
      id: 1,
      clip: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    },
    {
      id: 2,
      clip: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    },
    {
      id: 3,
      clip: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    }, 
    {
      id: 4,
      clip: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    },
    {
      id: 5,
      clip: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    },
    {
      id: 6,
      clip: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    },
    {
      id: 7,
      clip: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    },
    {
      id: 8,
      clip: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    },
    {
      id: 9,
      clip: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 10,
      clip: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    },
    {
      id: 11,
      clip: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    }
  ]);

  return (
    <View className='w-full h-full'>
      { videos.length === 0 &&
        <View className='flex-1 justify-center items-center'>
          <Text className='text-white'>No hay videos disponibles.</Text>
        </View>
      }

      { videos.length > 0 &&
        <View className='w-full mb-10'>
          { videos.map((item, index) => (
              <VideoCollageItem
                key={index}
                item={item}
                onPress={() => navigation.navigate("VideoSinglerScreen", { startIndex: index, videos })}
              />))
          }
        </View>
      }

      {/* <FlatList
        data={videos}
        numColumns={1}
        scrollEnabled={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <VideoCollageItem
            item={item}
            onPress={() => navigation.navigate("VideoSinglerScreen", { startIndex: index, videos })}
          />    
        )}
      /> */}
    </View>
  );
}

export default VideoCollage;
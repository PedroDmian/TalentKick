import React, { useState, useEffect, useRef } from "react";
import { Pressable, Text, View, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import Video from "react-native-video";
import Icon from 'react-native-vector-icons/FontAwesome';

import { IVideoCollageProps } from "../../../domain/models/shared/IVideoCollage";

const styles = StyleSheet.create({
  itemWrapper: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 24,
    borderRadius: 32,
    overflow: 'hidden',
  },
  videoContainer: {
    width: '100%',
    height: 280,
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  }
});

interface Props extends IVideoCollageProps {
  active?: boolean;
  paused?: boolean;
}

const VideoCollageItem = React.memo(({
  item, onPress, active = false, paused = true
}: Props) => {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!active) {
      setIsVideoReady(false);
      setLoading(false);
    }
  }, [active]);

  const onVideoLoad = () => {
    setLoading(false);
    setIsVideoReady(true);
  };

  const onVideoLoadStart = () => {
    setLoading(true);
  };

  return (
    <View style={styles.itemWrapper}>
      <View className="w-full flex-row px-4 py-4 items-center">
        <Image
          source={{ uri: item.userAvatar || 'https://images.pexels.com/photos/27674887/pexels-photo-27674887.jpeg' }}
          className="w-12 h-12 rounded-full border-2 border-salt"
          resizeMode='cover'
          // Optimización de memoria para Android
          // @ts-ignore
          fadeDuration={0}
        />
        <View className="flex-1 ms-3">
          <Text className="text-dark font-monaBold text-base" numberOfLines={1}>
            {item.username || 'Usuario'}
          </Text>
          <View className="flex-row items-center justify-between w-full">
            <Text className="text-gray-400 text-sm font-mona">{item.userRole || 'Jugador'}</Text>
            <Text className="text-gray-300 font-monaLight text-[10px]">Reciente</Text>
          </View>
        </View>
      </View>
      
      <View className="w-full px-2">
        <View style={styles.videoContainer}>
          {item.thumbnail && (
            <Image 
              source={{ uri: item.thumbnail }} 
              style={StyleSheet.absoluteFill} 
              resizeMode="cover" 
            />
          )}
          
          {active ? (
            <>
              <Video
                source={{ uri: item.clip }}
                repeat
                muted
                paused={paused}
                style={[styles.video, { opacity: isVideoReady ? 1 : 0 }]}
                resizeMode={'cover'}
                onLoadStart={onVideoLoadStart}
                onLoad={onVideoLoad}
                shutterColor="black"
                // Reducir buffer para ahorrar memoria
                bufferConfig={{
                  minBufferMs: 1000,
                  maxBufferMs: 2500,
                  bufferForPlaybackMs: 500,
                  bufferForPlaybackAfterRebufferMs: 1000,
                }}
              />
              {(!isVideoReady || loading) && (
                <View style={StyleSheet.absoluteFill} className="items-center justify-center bg-black/40">
                   <ActivityIndicator color="#FF6B00" size="large" />
                </View>
              )}
            </>
          ) : (
            <Pressable onPress={onPress} className="items-center justify-center flex-1 w-full h-full bg-black/30">
               <Icon name="play-circle" size={50} color="rgba(255,255,255,0.5)" />
            </Pressable>
          )}
        </View>

        <View className='w-full flex-row justify-between items-center mt-2 px-2'>
          <View className='flex-1 flex-row py-4'>
            <View className="flex-row items-center bg-salt rounded-full px-4 py-2 mr-3">
              <Icon name='heart' size={14} color={`#FF6B00`} />
              <Text className="text-dark font-monaBold ms-2 text-xs">36</Text>
            </View>
            <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
              <Icon name="comment-o" size={14} color="#4b5563" />
              <Text className="text-gray-700 font-monaBold ms-2 text-xs">12</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onPress} className="flex-row items-center">
            <Text className="text-orange font-monaBold text-xs">Visitar</Text>
            <Icon name={'angle-right'} size={16} color="#FF6B00" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

export default VideoCollageItem;
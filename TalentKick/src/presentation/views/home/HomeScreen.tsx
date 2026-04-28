import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import {
  View,
  RefreshControl,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Dimensions,
  ViewToken,
  InteractionManager
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { INavigationProps } from '../../../domain/models/INavigation';
import { useFeeds } from '../../hooks/useFeeds';

import Badges from '../../components/Badges';
import Carousel from '../../components/Carousel';
import Title from '../../components/Title';
import VideoCollageItem from '../../components/widgets/VideoCollageItem';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BADGES_TITLES = ['Inicio', 'Reels'];

const BADGES_ACTIVE_STYLE = { 
  classNameContainer: 'bg-orange', 
  classNameText: 'text-white font-bold' 
};

const BADGES_INACTIVE_STYLE = { 
  classNameText: 'text-slate-800 font-bold' 
};

const RECENT_TITLE_STYLE = {
  classNameTitle: 'text-dark font-mona',
  classNameSubtitle: 'text-gray-600'
};

const HomeScreen = ({ navigation }: INavigationProps) => {
  const isFocused = useIsFocused();
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [selectionBadges, setSelectionBadges] = useState(0);
  
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    refetch, 
    isRefreshing,
    isLoading
  } = useFeeds();

  const allFeeds = useMemo(() => {
    return data?.pages.flatMap(page => (page as any).data) || [];
  }, [data]);

  // Esperar a que la pantalla se asiente
  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });
    return () => task.cancel();
  }, []);

  // Activar el primer video cuando haya datos y estemos listos
  useEffect(() => {
    if (isReady && allFeeds.length > 0 && !activeVideoId) {
      setActiveVideoId(allFeeds[0].id);
    }
  }, [isReady, allFeeds]);

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const mostVisibleItem = viewableItems.reduce((prev, current) => {
        const prevPercent = prev.percentVisible || 0;
        const currentPercent = current.percentVisible || 0;
        return currentPercent > prevPercent ? current : prev;
      });

      if (mostVisibleItem && mostVisibleItem.item) {
        setActiveVideoId(mostVisibleItem.item.id);
      }
    }
  }, []);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 30,
    minimumViewTime: 100
  }).current;

  const renderHeader = () => (
    <View>
      <View className='justify-center items-center'>
        <Image source={require('../../../assets/icons/logo-letters-h.png')} className='h-20 m-0' resizeMode={'contain'} />
      </View>
      <View className='w-full'>
        <Carousel className='w-full'>
          {BADGES_TITLES.map((title, index) => (
            <TouchableOpacity onPress={() => setSelectionBadges(index)} key={index}>
              <Badges title={title} isActive={index === selectionBadges} classStyle={index === selectionBadges ? BADGES_ACTIVE_STYLE : BADGES_INACTIVE_STYLE} />
            </TouchableOpacity>
          ))}
        </Carousel>
      </View>
      <Title title={'Recientes'} subtitle={'Descubre los videos más recientes en esta sección'} classStyle={RECENT_TITLE_STYLE} />
    </View>
  );

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View style={{ height: SCREEN_HEIGHT * 0.45 }} className='justify-center items-center'>
          <ActivityIndicator size="large" color="#FF6B00" />
          <Text className='text-gray-400 font-mona mt-4'>Cargando contenido...</Text>
        </View>
      );
    }
    return (
      <View style={{ height: SCREEN_HEIGHT * 0.45 }} className='justify-center items-center px-10'>
        <Image source={require('../../../assets/icons/box-books.png')} className='w-24 h-24 opacity-20' resizeMode='contain' />
        <Text className='text-dark font-monaBold text-xl mt-4 text-center'>No hay contenido disponible</Text>
        <TouchableOpacity onPress={() => refetch()} className='mt-6 bg-orange px-8 py-3 rounded-full'>
          <Text className='text-white font-monaBold'>Actualizar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={allFeeds}
        keyExtractor={(item) => `feed-${item.id}`}
        renderItem={({ item }) => (
          <VideoCollageItem
            item={{
              id: item.id,
              clip: item.archives?.[0]?.url || '',
              thumbnail: (item.archives?.find((a: any) => a.type?.includes('image'))?.url || item.archives?.[1]?.url) || 'https://images.pexels.com/photos/10329718/pexels-photo-10329718.jpeg',
              description: item.description,
              username: item.user?.name ? `${item.user.name} ${item.user.lastname || ''}` : 'Usuario',
              userAvatar: item.user?.avatar,
              userRole: item.user?.role,
              createdAt: item.createdAt,
            }}
            onPress={() => {}}
            active={isFocused && activeVideoId === item.id}
            paused={!isFocused || activeVideoId !== item.id}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        refreshControl={<RefreshControl refreshing={isRefreshing as any} onRefresh={refetch} colors={['#FF6B00']} />}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={3}
      />
      {!isReady && (
        <View style={StyleSheet.absoluteFill} className="bg-salt justify-center items-center">
          <ActivityIndicator color="#FF6B00" size="large" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: SCREEN_HEIGHT * 0.5
  },
});

export default HomeScreen;
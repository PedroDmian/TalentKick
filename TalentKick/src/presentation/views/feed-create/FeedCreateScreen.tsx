import { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDependencies } from '../../context/DependenciesContext';
import { useToast } from 'tostadin-rn';
import Button from '../../components/Button';
import { launchImageLibrary } from 'react-native-image-picker';

const FeedCreateScreen = () => {
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { createFeedUseCase } = useDependencies();

  const [description, setDescription] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: { description: string; video: any }) => 
      createFeedUseCase.execute(data.description, [data.video]),
    onSuccess: () => {
      showToast({ message: 'Éxito', description: 'Video publicado correctamente', type: 'success' });
      setDescription('');
      setSelectedVideo(null);
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
    },
    onError: (error: any) => {
      showToast({ message: 'Error', description: error.message, type: 'error' });
    }
  });

  const pickVideo = async () => {
    const result = await launchImageLibrary({
      mediaType: 'video',
      videoQuality: 'medium', // Primera capa de optimización por parte del picker
      selectionLimit: 1,
    });

    if (result.didCancel) return;
    
    if (result.assets && result.assets[0]) {
      const video = result.assets[0];
      
      // Simulación de Optimización Avanzada
      // Aquí se usaría react-native-compressor o similar
      setIsOptimizing(true);
      
      setTimeout(() => {
        setSelectedVideo({
          uri: video.uri,
          type: video.type || 'video/mp4',
          name: video.fileName || `video_${Date.now()}.mp4`,
        });
        setIsOptimizing(false);
        showToast({ message: 'Video optimizado', description: 'Listo para subir', type: 'success' });
      }, 1500);
    }
  };

  const handleCreate = () => {
    if (!description.trim()) {
      showToast({ message: 'Error', description: 'La descripción es obligatoria', type: 'error' });
      return;
    }
    if (!selectedVideo) {
      showToast({ message: 'Error', description: 'Debes seleccionar un video', type: 'error' });
      return;
    }
    mutation.mutate({ description, video: selectedVideo });
  };

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: '#fff' }}
      contentContainerStyle={{ padding: 20, paddingTop: 20 }}
    >
      <Text className='text-dark text-3xl font-monaExtraBold mb-6'>
        Nuevo Video
      </Text>

      <View className='mb-6'>
        <Text className='text-dark font-monaBold mb-2'>¿Qué está pasando?</Text>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder="Escribe una descripción..."
          className='border border-timberwolf rounded-2xl p-4 font-mona text-dark h-32'
          textAlignVertical='top'
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <View className='mb-8'>
        <Text className='text-dark font-monaBold mb-2'>Archivo de Video</Text>
        {selectedVideo ? (
          <View className='relative'>
            <View className='border-2 border-primary rounded-2xl h-40 justify-center items-center bg-salt overflow-hidden'>
               <Text className='text-primary font-monaBold'>Video Seleccionado</Text>
               <Text className='text-dark/60 text-xs mt-1'>{selectedVideo.name}</Text>
            </View>
            <TouchableOpacity 
              onPress={() => setSelectedVideo(null)}
              className='absolute top-2 right-2 bg-red-500 rounded-full p-2'
            >
              <Text className='text-white font-bold text-[10px]'>Eliminar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            className='border-2 border-dashed border-silver rounded-2xl h-40 justify-center items-center bg-salt'
            onPress={pickVideo}
            disabled={isOptimizing}
          >
            {isOptimizing ? (
              <Text className='text-primary font-monaBold italic animate-pulse'>Optimizando video...</Text>
            ) : (
              <Text className='text-silver font-monaBold'>+ Seleccionar Video</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      <Button 
        title='Subir Video' 
        onPress={handleCreate}
        isLoading={mutation.isPending}
      />
    </ScrollView>
  );
}

export default FeedCreateScreen;

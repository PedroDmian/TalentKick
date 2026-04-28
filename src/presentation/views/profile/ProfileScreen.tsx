import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useToast } from 'tostadin-rn';

import Title from '../../components/Title';
import { useAuthStore } from '../../store/useAuthStore';
import { useUser } from '../../hooks/useUser';
import { ITitleStyleProps } from '../../../domain/models/shared/ITitle';
import EditProfileModal from './EditProfileModal';

const { width } = Dimensions.get('window');

const TITLE_STYLE: ITitleStyleProps = {
  classNameTitle: 'text-dark text-3xl font-monaExtraBold mt-2 text-center',
  classNameSubtitle: 'text-silver text-sm font-monaBold uppercase tracking-widest text-center'
};

const GALLERY_TITLE_STYLE: ITitleStyleProps = {
  classNameTitle: 'text-dark text-2xl font-monaBold mt-0',
};

const ProfileScreen = () => {
  const logout = useAuthStore((state) => state.logout);
  const userStore = useAuthStore((state) => state.user);
  const { showToast } = useToast();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const { 
    useUserProfile, 
    updateAvatar, 
    isUpdatingAvatar, 
    updateProfile,
    isUpdatingProfile,
    addToGallery, 
    isAddingToGallery 
  } = useUser();

  // Obtenemos los datos frescos del perfil (incluyendo galería y bio)
  const { data: user, isLoading: isLoadingProfile } = useUserProfile(userStore?.id || '');

  const handlePickAvatar = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
    if (result.assets && result.assets[0].uri) {
      updateAvatar(result.assets[0].uri);
    }
  };

  const handlePickGalleryImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
    if (result.assets && result.assets[0].uri) {
      addToGallery(result.assets[0].uri);
    }
  };

  if (isLoadingProfile && !user) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View className='flex-1 bg-white'>
      {/* Botón Cerrar Sesión - Fijo arriba */}
      <TouchableOpacity 
        onPress={logout}
        className='absolute right-5 z-50 p-3 bg-dark/10 rounded-full'
        style={{ top: 50 }}
      >
        <Icon name="sign-out" size={16} color="#fff" />
      </TouchableOpacity>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header con Banner Color o Degradado */}
        <View className="h-40 bg-orange w-full" />

        {/* Contenido del Perfil */}
        <View className="px-5 -mt-20 items-center">
          <TouchableOpacity onPress={handlePickAvatar} className="relative">
            <Image 
              source={{ uri: user?.avatar || 'https://via.placeholder.com/150' }} 
              className="w-40 h-40 rounded-full border-4 border-white bg-slate-200"
            />
            <View className="absolute bottom-1 right-1 bg-orange p-3 rounded-full border-2 border-white">
              <Icon name="camera" size={14} color="#fff" />
            </View>
            {(isUpdatingAvatar) && (
              <View className="absolute inset-0 bg-black/30 rounded-full items-center justify-center">
                <ActivityIndicator color="#fff" />
              </View>
            )}
          </TouchableOpacity>

          <Title
            title={user?.name ? `${user.name} ${user.lastname || ''}` : 'Usuario'}
            subtitle={user?.email || '@username'}
            classStyle={TITLE_STYLE}
          />

          <View className='w-full flex-row justify-center gap-x-4 mt-6'>
            <TouchableOpacity 
              onPress={handlePickGalleryImage}
              disabled={isAddingToGallery}
              className="bg-dark px-8 py-3 rounded-2xl flex-row items-center"
            >
              {isAddingToGallery ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Icon name="plus" size={14} color="#fff" />
                  <Text className="text-white font-monaBold ms-2">Añadir Foto</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View className='mt-8 w-full px-2'>
            <Text className='text-gray-500 text-base font-mona text-center italic'>
              {user?.bio || '"Sin biografía aún. ¡Cuéntanos algo sobre ti!"'}
            </Text>
          </View>

          {/* Galería */}
          <View className='mt-10 w-full'>
            <Title
              title={`Galería`}
              classStyle={GALLERY_TITLE_STYLE}
            />

            <View className="flex-row flex-wrap justify-between mt-4">
              {user?.gallery && user.gallery.length > 0 ? (
                user.gallery.map((img: any, index: number) => (
                  <Image
                    key={index}
                    source={{ uri: img.url }}
                    className='rounded-2xl mb-4'
                    style={{ width: (width - 60) / 2, height: 200 }}
                  />
                ))
              ) : (
                <View className="w-full py-10 items-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <Icon name="image" size={40} color="#cbd5e1" />
                  <Text className="text-slate-400 font-mona mt-2">No hay fotos en tu galería</Text>
                </View>
              )}
            </View>
          </View>

          {/* Botón Editar al Final */}
          <TouchableOpacity 
            className="w-full mt-10 border-2 border-slate-200 py-4 rounded-2xl items-center flex-row justify-center mb-10"
            disabled={isUpdatingProfile}
            onPress={() => setIsEditModalVisible(true)}
          >
            {isUpdatingProfile ? (
              <ActivityIndicator color="#64748b" />
            ) : (
              <>
                <Icon name="edit" size={16} color="#64748b" />
                <Text className="text-slate-500 font-monaBold ms-3">Editar Perfil</Text>
              </>
            )}
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Modal de Edición */}
      <EditProfileModal
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        user={user || null}
        onSave={updateProfile}
        isLoading={isUpdatingProfile}
      />
    </View>
  );
}

export default ProfileScreen;

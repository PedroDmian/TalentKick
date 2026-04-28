import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDependencies } from '../context/DependenciesContext';
import { useAuthStore } from '../store/useAuthStore';
import { useToast } from 'tostadin-rn';
import { IUser } from '../../domain/models/IUser';

export const useUser = () => {
  const { 
    getUserByIdUseCase, 
    updateUserAvatarUseCase, 
    updateUserUseCase,
    addUserGalleryImageUseCase 
  } = useDependencies();
  const { user, setUser } = useAuthStore();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const useUserProfile = (id: string) => {
    return useQuery({
      queryKey: ['user-profile', id],
      queryFn: () => getUserByIdUseCase.execute(id),
      enabled: !!id,
    });
  };

  const updateAvatarMutation = useMutation({
    mutationFn: (imageUri: string) => {
      if (!user?.id) throw new Error('User not authenticated');
      return updateUserAvatarUseCase.execute(user.id, imageUri);
    },
    onSuccess: (newAvatarUrl) => {
      if (user) {
        setUser({ ...user, avatar: newAvatarUrl });
      }
      showToast({
        message: 'Éxito',
        description: 'Avatar actualizado',
        type: 'success'
      });
      queryClient.invalidateQueries({ queryKey: ['user-profile', user?.id] });
    },
    onError: (error: any) => {
      showToast({ message: 'Error', description: error.message, type: 'error' });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (userData: Partial<IUser>) => {
      if (!user?.id) throw new Error('User not authenticated');
      return updateUserUseCase.execute(user.id, userData);
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      showToast({ message: 'Éxito', description: 'Perfil actualizado', type: 'success' });
      queryClient.invalidateQueries({ queryKey: ['user-profile', user?.id] });
    },
    onError: (error: any) => {
      showToast({ message: 'Error', description: error.message, type: 'error' });
    },
  });

  const addToGalleryMutation = useMutation({
    mutationFn: (imageUri: string) => {
      if (!user?.id) throw new Error('User not authenticated');
      return addUserGalleryImageUseCase.execute(user.id, imageUri);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile', user?.id] });
      showToast({ message: 'Éxito', description: 'Foto añadida a la galería', type: 'success' });
    },
    onError: (error: any) => {
      showToast({ message: 'Error', description: error.message, type: 'error' });
    },
  });

  return {
    useUserProfile,
    updateAvatar: updateAvatarMutation.mutate,
    isUpdatingAvatar: updateAvatarMutation.isPending,
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdatingProfile: updateProfileMutation.isPending,
    addToGallery: addToGalleryMutation.mutate,
    isAddingToGallery: addToGalleryMutation.isPending,
  };
};

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from '../../domain/models/IUser';

interface AuthState {
  user: IUser | null;
  token: string | null;
  setSession: (user: IUser, token: string) => void;
  setUser: (user: IUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setSession: (user, token) => set({ user, token }),
      setUser: (user) => set({ user }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage', // Nombre de la llave en AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

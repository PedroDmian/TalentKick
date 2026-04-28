import { useMutation } from '@tanstack/react-query';
import { useDependencies } from '../context/DependenciesContext';
import { useAuthStore } from '../store/useAuthStore';

export const useLogin = () => {
  const { loginUseCase } = useDependencies();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUseCase.execute(email, password),
    onSuccess: (data) => {
      setSession(data.user, data.accessToken);
    },
  });
};

export const useRegister = () => {
  const { registerUseCase } = useDependencies();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: (userData: any) => registerUseCase.execute(userData),
    onSuccess: (data) => {
      setSession(data.user, data.accessToken);
    },
  });
};

export const useLoginGoogle = () => {
  const { loginGoogleUseCase } = useDependencies();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: (role?: string) => loginGoogleUseCase.execute(role),
    onSuccess: (data) => {
      setSession(data.user, data.accessToken);
    },
  });
};

export const useLoginApple = () => {
  const { loginAppleUseCase } = useDependencies();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: (role?: string) => loginAppleUseCase.execute(role),
    onSuccess: (data) => {
      setSession(data.user, data.accessToken);
    },
  });
};

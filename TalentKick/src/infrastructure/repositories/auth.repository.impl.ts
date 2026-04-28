import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthResponse, IUser } from '../../domain/models/IUser';
import { api } from '../api/api';

export class AuthRepositoryImpl implements AuthRepository {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  }

  async register(userData: Partial<IUser> & { password?: string }): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  }

  async loginWithGoogle(idToken: string, role?: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login-google', { idToken, role });
    return response.data;
  }

  async loginWithApple(idToken: string, role?: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login-apple', { idToken, role });
    return response.data;
  }

  async refreshToken(token: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/refresh-token', { refreshToken: token });
    return response.data;
  }

  async logout(): Promise<void> {
    // Implementation for logout (e.g., clearing local storage)
  }
}

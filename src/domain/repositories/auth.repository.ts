import { AuthResponse, IUser } from '../models/IUser';

export interface AuthRepository {
  login(email: string, password: string): Promise<AuthResponse>;
  register(userData: Partial<IUser> & { password?: string }): Promise<AuthResponse>;
  loginWithGoogle(idToken: string, role?: string): Promise<AuthResponse>;
  loginWithApple(idToken: string, role?: string): Promise<AuthResponse>;
  refreshToken(token: string): Promise<AuthResponse>;
  logout(): Promise<void>;
}

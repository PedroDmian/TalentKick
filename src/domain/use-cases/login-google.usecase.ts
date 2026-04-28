import { AuthRepository } from '../repositories/auth.repository';
import { AuthResponse } from '../models/IUser';
import { FirebaseAuthService } from '../../infrastructure/services/firebase-auth.service';

export class LoginGoogleUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly firebaseAuthService: FirebaseAuthService
  ) {}

  async execute(role?: string): Promise<AuthResponse> {
    const idToken = await this.firebaseAuthService.signInWithGoogle();
    return await this.authRepository.loginWithGoogle(idToken, role);
  }
}

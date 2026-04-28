import { AuthRepository } from '../repositories/auth.repository';
import { AuthResponse } from '../models/IUser';

export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<AuthResponse> {
    return await this.authRepository.login(email, password);
  }
}

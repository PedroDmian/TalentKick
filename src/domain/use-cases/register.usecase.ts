import { AuthRepository } from '../repositories/auth.repository';
import { AuthResponse, IUser } from '../models/IUser';

export class RegisterUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(userData: Partial<IUser> & { password?: string }): Promise<AuthResponse> {
    return await this.authRepository.register(userData);
  }
}

import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { HashService } from '../../../infrastructure/services/HashService';

export class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashService
  ) {}

  async execute(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.password) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await this.hashService.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return user;
  }
}

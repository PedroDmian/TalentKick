import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';

export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, data: Partial<User>, requesterId: string, requesterRole: string): Promise<User> {
    if (id !== requesterId && requesterRole !== 'admin') {
      throw new Error('Unauthorized to update this user');
    }

    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    return await this.userRepository.update(id, data);
  }
}

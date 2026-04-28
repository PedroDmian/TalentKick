import { UserRepository } from '../../domain/repositories/UserRepository';

export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, requesterId: string, requesterRole: string): Promise<void> {
    if (id !== requesterId && requesterRole !== 'admin') {
      throw new Error('Unauthorized to delete this user');
    }

    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    await this.userRepository.delete(id);
  }
}

import { UserRepository } from '../repositories/user.repository';

export class UpdateUserAvatarUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string, imageUri: string): Promise<string> {
    return this.userRepository.updateAvatar(userId, imageUri);
  }
}

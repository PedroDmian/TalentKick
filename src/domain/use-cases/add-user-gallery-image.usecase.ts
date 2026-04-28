import { UserRepository } from '../repositories/user.repository';

export class AddUserGalleryImageUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string, imageUri: string): Promise<any> {
    return this.userRepository.addGalleryImage(userId, imageUri);
  }
}

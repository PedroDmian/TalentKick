import { UserRepository } from '../repositories/user.repository';
import { IUser } from '../models/IUser';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, userData: Partial<IUser>): Promise<IUser> {
    return this.userRepository.updateUser(id, userData);
  }
}

import { UserRepository } from '../repositories/user.repository';
import { IUser } from '../models/IUser';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<IUser> {
    return this.userRepository.getUserById(id);
  }
}

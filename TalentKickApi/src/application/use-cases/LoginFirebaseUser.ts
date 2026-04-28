import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { FirebaseService } from '../../../infrastructure/services/FirebaseService';
import { v4 as uuidv4 } from 'uuid';

export class LoginFirebaseUser {
  constructor(
    private userRepository: UserRepository,
    private firebaseService: FirebaseService
  ) {}

  async execute(idToken: string, role?: string): Promise<User> {
    const userInfo = await this.firebaseService.getUserInfoFromToken(idToken);
    
    if (!userInfo.email) {
      throw new Error('Email is required from Firebase login');
    }

    let user = await this.userRepository.findByEmail(userInfo.email);
    
    if (!user) {
      // Auto-registro para usuarios de Google/Apple si no existen localmente
      const [name, ...lastnameParts] = (userInfo.name || '').split(' ');
      user = new User({
        id: uuidv4(),
        role: (role as any) || 'user',
        type: role === 'recruiter' ? 'RECRUITER' : 'USER',
        name: name || 'User',
        lastname: lastnameParts.join(' ') || 'Firebase',
        email: userInfo.email,
        avatar: userInfo.avatar,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await this.userRepository.save(user);
    }

    return user;
  }
}

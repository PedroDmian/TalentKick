import { UserRepository } from '../../domain/repositories/UserRepository.impl';
import { User } from '../../domain/entities/User';
import { HashService } from '../../domain/services/HashService';
import { v4 as uuidv4 } from 'uuid';

export interface RegisterUserDTO {
  role?: string; // 'user' | 'recruiter'
  name: string;
  lastname: string;
  email: string;
  password?: string;
  avatar?: string;
  birthdate?: Date;
  sessionType: 'email' | 'google' | 'apple';
}

export class RegisterUser {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashService
  ) { }

  async execute(dto: RegisterUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    let hashedPassword = null;
    if (dto.password && dto.sessionType === 'email') {
      hashedPassword = await this.hashService.hash(dto.password);
    }

    console.log(dto.role);

    const newUser = new User({
      id: uuidv4(),
      role: (dto.role as any) || 'user', // Perfil: Jugador o Reclutador
      type: dto.sessionType,             // Método: email, google, apple
      name: dto.name,
      lastname: dto.lastname,
      email: dto.email,
      password: hashedPassword,
      avatar: dto.avatar,
      birthdate: dto.birthdate,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.userRepository.save(newUser);
  }
}

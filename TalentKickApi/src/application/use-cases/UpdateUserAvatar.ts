import { UserRepository } from '../../domain/repositories/UserRepository.impl';
import { S3Service } from '../../infrastructure/services/S3Service';

export interface UpdateUserAvatarDTO {
  userId: string;
  file: Express.Multer.File;
}

export class UpdateUserAvatar {
  constructor(
    private userRepository: UserRepository,
    private s3Service: S3Service,
  ) {}

  async execute(dto: UpdateUserAvatarDTO): Promise<string> {
    const { userId, file } = dto;

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Subir a S3 en la carpeta 'avatars'
    const { key } = await this.s3Service.uploadFile(file, 'avatars');
    
    // Actualizar el avatar del usuario con la KEY del archivo
    await this.userRepository.update(userId, { avatar: key });

    // Devolvemos la URL firmada para uso inmediato en el frontend
    return await this.s3Service.getSignedUrl(key);
  }
}

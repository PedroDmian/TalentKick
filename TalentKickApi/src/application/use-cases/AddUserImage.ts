import { UserRepository } from '../../domain/repositories/UserRepository.impl';
import { S3Service } from '../../infrastructure/services/S3Service';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../../infrastructure/config/prisma';

export interface AddUserImageDTO {
  userId: string;
  files: Express.Multer.File[];
}

export class AddUserImage {
  constructor(
    private userRepository: UserRepository,
    private s3Service: S3Service,
  ) { }

  async execute(dto: AddUserImageDTO): Promise<any> {
    const { userId, files } = dto;

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const uploadedImages = [];

    for (const file of files) {
      const { key, type } = await this.s3Service.uploadFile(file, 'gallery');

      const archive = await prisma.archive.create({
        data: {
          id: uuidv4(),
          url: key, // Guardamos la KEY
          type,
          createdBy: userId,
        }
      });

      const userArchive = await prisma.userArchive.create({
        data: {
          id: uuidv4(),
          userId,
          archiveId: archive.id,
        },
        include: {
          archive: true
        }
      });

      const signedUrl = await this.s3Service.getSignedUrl(key);
      userArchive.archive.url = signedUrl;

      uploadedImages.push(userArchive);
    }

    return uploadedImages;
  }
}

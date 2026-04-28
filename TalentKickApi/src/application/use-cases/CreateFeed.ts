import { Feed } from '../../domain/entities/Feed';
import { FeedRepositoryImpl } from '../../domain/repositories/FeedRepository.impl';
import { S3Service } from '../../infrastructure/services/S3Service';
import { v4 as uuidv4 } from 'uuid';
import { ArchiveProps } from '../../domain/entities/Archive';

export interface CreateFeedDTO {
  userId: string;
  description: string;
  files?: Express.Multer.File[];
  createdBy?: string;
}

export class CreateFeed {
  constructor(
    private feedRepository: FeedRepositoryImpl,
    private s3Service: S3Service,
  ) { }

  async execute(dto: CreateFeedDTO): Promise<Feed> {
    const { userId, description, files, createdBy } = dto;

    const newFeed = new Feed({
      id: uuidv4(),
      userId,
      description,
      createdBy,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const archiveData: Array<Partial<ArchiveProps>> = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const uploadedFile = await this.s3Service.uploadFile(file);

        archiveData.push({
          id: uuidv4(),
          url: uploadedFile.key, // Guardamos la KEY (ej: feeds/uuid.mp4) no la URL
          type: uploadedFile.type,
          createdBy: userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    const createdFeed = await this.feedRepository.save(newFeed, archiveData);

    return createdFeed;
  }
}

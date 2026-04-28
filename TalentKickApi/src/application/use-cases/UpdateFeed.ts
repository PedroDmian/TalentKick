import { Feed } from '../../domain/entities/Feed';
import { FeedRepositoryImpl } from '../../domain/repositories/FeedRepository.impl';
import { S3Service } from '../../infrastructure/services/S3Service';
import { v4 as uuidv4 } from 'uuid';
import { ArchiveProps } from '../../domain/entities/Archive';

export interface UpdateFeedDTO {
  description?: string;
  files?: Express.Multer.File[];
  updatedBy?: string;
}

export class UpdateFeed {
  constructor(
    private feedRepository: FeedRepositoryImpl,
    private s3Service: S3Service,
  ) {}

  async execute(feedId: string, dto: UpdateFeedDTO): Promise<Feed> {
    const existingFeed = await this.feedRepository.findById(feedId);
    if (!existingFeed) {
      throw new Error('Feed not found');
    }

    const { description, files, updatedBy } = dto;

    if (!updatedBy || existingFeed.userId !== updatedBy) {
      throw new Error('Unauthorized to update this feed');
    }

    const feedUpdate: Partial<Feed> = {
      updatedBy,
    };
    if (description !== undefined) {
      feedUpdate.description = description;
    }

    let newArchiveData: Array<Partial<ArchiveProps>> | undefined;

    if (files && files.length > 0) {
      newArchiveData = [];
      for (const file of files) {
        const uploadedFile = await this.s3Service.uploadFile(file);
        newArchiveData.push({
          id: uuidv4(),
          url: uploadedFile.url,
          type: uploadedFile.type,
          createdBy: existingFeed.userId, // El creador del archivo es el usuario del feed
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    const updatedFeed = await this.feedRepository.update(feedId, feedUpdate, newArchiveData);

    return updatedFeed;
  }
}

import { UserRepository } from '../../domain/repositories/UserRepository.impl';
import { User } from '../../domain/entities/User';
import prisma from '../config/prisma';
import { UserMapper } from '../mappers/UserMapper';
import { S3Service } from '../services/S3Service';

export class UserRepositoryImpl implements UserRepository {
  private s3Service = new S3Service();

  private async signAvatar(user: any): Promise<any> {
    if (!user) return user;
    
    // Firmar avatar si es de S3
    if (user.avatar && user.avatar.startsWith('avatars/')) {
      user.avatar = await this.s3Service.getSignedUrl(user.avatar);
    }

    // Firmar archivos de la galería si existen
    if (user.gallery && user.gallery.length > 0) {
      user.gallery = await Promise.all(
        user.gallery.map(async (ug: any) => {
          if (ug.archive && ug.archive.url) {
            // Asumimos que si la URL no es una URL completa de S3 (firmada), es la KEY
            // O usamos el método getKeyFromUrl para estar seguros
            const signedUrl = await this.s3Service.getSignedUrl(ug.archive.url);
            return {
              ...ug,
              archive: {
                ...ug.archive,
                url: signedUrl
              }
            };
          }
          return ug;
        })
      );
    }
    
    return user;
  }

  async save(user: User): Promise<User> {
    const data = await prisma.user.create({
      data: {
        id: user.id,
        role: user.role,
        type: user.type,
        name: user.name,
        lastname: user.lastname,
        bio: user.bio,
        birthdate: user.birthdate,
        avatar: user.avatar,
        email: user.email,
        password: user.password,
        createdBy: user.createdBy,
        updatedBy: user.updatedBy,
      },
      include: {
        gallery: {
          include: {
            archive: true
          }
        }
      }
    });
    const signedData = await this.signAvatar(data);
    return UserMapper.toDomain(signedData);
  }

  async findById(id: string): Promise<User | null> {
    const data = await prisma.user.findFirst({
      where: { id, deletedAt: null },
      include: {
        gallery: {
          include: {
            archive: true
          }
        }
      }
    });
    if (!data) return null;
    const signedData = await this.signAvatar(data);
    return UserMapper.toDomain(signedData);
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await prisma.user.findFirst({
      where: { email, deletedAt: null },
      include: {
        gallery: {
          include: {
            archive: true
          }
        }
      }
    });
    if (!data) return null;
    const signedData = await this.signAvatar(data);
    return UserMapper.toDomain(signedData);
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const userToUpdate: any = {};
    if (user.name) userToUpdate.name = user.name;
    if (user.lastname) userToUpdate.lastname = user.lastname;
    if (user.bio !== undefined) userToUpdate.bio = user.bio;
    if (user.birthdate) userToUpdate.birthdate = user.birthdate;
    if (user.avatar) userToUpdate.avatar = user.avatar;
    if (user.type) userToUpdate.type = user.type;
    if (user.role) userToUpdate.role = user.role;
    if (user.password) userToUpdate.password = user.password;
    if (user.updatedBy) userToUpdate.updatedBy = user.updatedBy;

    const data = await prisma.user.update({
      where: { id },
      data: userToUpdate,
      include: {
        gallery: {
          include: {
            archive: true
          }
        }
      }
    });
    const signedData = await this.signAvatar(data);
    return UserMapper.toDomain(signedData);
  }

  async delete(id: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findAll(): Promise<User[]> {
    const data = await prisma.user.findMany({
      where: { deletedAt: null },
      include: {
        gallery: {
          include: {
            archive: true
          }
        }
      }
    });
    
    const signedUsers = await Promise.all(data.map(u => this.signAvatar(u)));
    return signedUsers.map(UserMapper.toDomain);
  }
}

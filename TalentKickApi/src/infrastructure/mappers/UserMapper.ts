import { User, UserProps } from '../../domain/entities/User';
import { ArchiveMapper } from './FeedMapper';

export class UserMapper {
  static toDomain(data: any): User {
    const props: UserProps = {
      id: data.id,
      role: data.role,
      type: data.type,
      name: data.name,
      lastname: data.lastName || data.lastname, // Manejar discrepancia de nombres en Prisma vs Domain
      bio: data.bio,
      birthdate: data.birthDate || data.birthdate,
      avatar: data.avatar,
      email: data.email,
      password: data.password,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      gallery: data.gallery?.map((ug: any) => ArchiveMapper.toDomain(ug.archive)),
    };
    return new User(props);
  }

  // Si fuera necesario un mapeo de dominio a persistencia, se añadiría aquí.
  // static toPersistence(user: User): any {
  //   return {
  //     id: user.id,
  //     role: user.role,
  //     type: user.type,
  //     // ... otros campos
  //   };
  // }
}

import { Request, Response } from 'express';
import { GetUser } from '../../application/use-cases/GetUser';
import { UpdateUser } from '../../application/use-cases/UpdateUser';
import { DeleteUser } from '../../application/use-cases/DeleteUser';
import { ListUsers } from '../../application/use-cases/ListUsers';
import { AddUserImage } from '../../application/use-cases/AddUserImage';
import { UpdateUserAvatar } from '../../application/use-cases/UpdateUserAvatar';
import { User } from '../../domain/entities/User';

export class UserController {
  constructor(
    private getUser: GetUser,
    private updateUser: UpdateUser,
    private deleteUser: DeleteUser,
    private listUsers: ListUsers,
    private addUserImage: AddUserImage,
    private updateUserAvatar: UpdateUserAvatar
  ) { }

  async updateAvatar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const requesterId = (req as any).user?.id;

      if (id !== requesterId) {
        return res.status(403).json({ message: 'Unauthorized to update this avatar' });
      }

      const file = req.file as Express.Multer.File;
      if (!file) {
        return res.status(400).json({ message: 'No file provided' });
      }

      const signedUrl = await this.updateUserAvatar.execute({ userId: id, file });
      res.status(200).json({ avatar: signedUrl });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async addToGallery(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const requesterId = (req as any).user?.id;

      if (id !== requesterId) {
        return res.status(403).json({ message: 'Unauthorized to upload to this gallery' });
      }

      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ message: 'No files provided' });
      }

      const result = await this.addUserImage.execute({ userId: id, files });
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  private mapUserResponse(user: User, requesterRole?: string) {
    const data = user.toJSON();

    // Si el que solicita es admin o recruiter, devolvemos todo
    if (requesterRole === 'admin' || requesterRole === 'recruiter') {
      return data;
    }

    // Si es un usuario normal, ocultamos datos sensibles (ej. birthdate, email opcionalmente)
    const { birthdate, email, ...publicData } = data as any;
    return {
      ...publicData,
      // Podríamos decidir qué más ocultar aquí según requerimientos
    };
  }

  async getOne(req: Request, res: Response) {
    try {
      const user = await this.getUser.execute(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const requesterRole = (req as any).user?.role;
      res.json(this.mapUserResponse(user, requesterRole));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const users = await this.listUsers.execute();
      const requesterRole = (req as any).user?.role;
      res.json(users.map(u => this.mapUserResponse(u, requesterRole)));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const requesterId = (req as any).user?.id;
      const requesterRole = (req as any).user?.role;

      if (!requesterId) return res.status(401).json({ message: 'Not authenticated' });

      const user = await this.updateUser.execute(req.params.id, req.body, requesterId, requesterRole);
      res.json(user.toJSON());
    } catch (error: any) {
      const status = error.message === 'User not found' ? 404 :
        error.message === 'Unauthorized to update this user' ? 403 : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const requesterId = (req as any).user?.id;
      const requesterRole = (req as any).user?.role;

      if (!requesterId) return res.status(401).json({ message: 'Not authenticated' });

      await this.deleteUser.execute(req.params.id, requesterId, requesterRole);
      res.status(204).send();
    } catch (error: any) {
      const status = error.message === 'User not found' ? 404 :
        error.message === 'Unauthorized to delete this user' ? 403 : 400;
      res.status(status).json({ error: error.message });
    }
  }
}

import { Request, Response } from 'express';
import { CreateFeed } from '../../application/use-cases/CreateFeed';
import { ListFeeds } from '../../application/use-cases/ListFeeds';
import { GetFeed } from '../../application/use-cases/GetFeed';
import { UpdateFeed } from '../../application/use-cases/UpdateFeed';
import { DeleteFeed } from '../../application/use-cases/DeleteFeed';

export class FeedController {
  constructor(
    private createFeed: CreateFeed,
    private listFeeds: ListFeeds,
    private getFeed: GetFeed,
    private updateFeed: UpdateFeed,
    private deleteFeed: DeleteFeed,
  ) { }
async create(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    console.log('[DEBUG] Body recibido:', req.body);
    console.log('[DEBUG] Files recibidos:', req.files ? (req.files as any[]).length : 0);

    // Si req.body es null o no existe, usamos un objeto vacío para evitar errores de desestructuración
    const body = req.body || {};
    const description = body.description;
    const files = req.files as Express.Multer.File[] | undefined;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const feed = await this.createFeed.execute({ userId, description, files, createdBy: userId });
    res.status(201).json(feed.toJSON());
  } catch (error: any) {
    console.error('Error creating feed:', error);
    res.status(400).json({ error: error.message });
  }
}

  async list(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const userId = req.query.userId as string | undefined;
      const [feeds, total] = await this.listFeeds.execute(page, limit, userId);
      res.json({
        data: feeds.map(feed => feed.toJSON()),
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const feed = await this.getFeed.execute(req.params.id);
      if (!feed) {
        return res.status(404).json({ message: 'Feed not found' });
      }
      res.json(feed.toJSON());
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = req.user?.id; // Del middleware de autenticación
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      const feedId = req.params.id;
      const { description } = req.body;
      const files = req.files as Express.Multer.File[] | undefined;

      const updatedFeed = await this.updateFeed.execute(feedId, { description, files, updatedBy: userId });
      res.json(updatedFeed.toJSON());
    } catch (error: any) {
      const status = error.message === 'Feed not found' ? 404 :
        error.message === 'Unauthorized to update this feed' ? 403 : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      const feedId = req.params.id;
      await this.deleteFeed.execute(feedId, userId);
      res.status(204).send();
    } catch (error: any) {
      const status = error.message === 'Feed not found' ? 404 : 403;
      res.status(status).json({ error: error.message });
    }
  }
}

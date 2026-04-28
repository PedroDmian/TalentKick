import { Request, Response } from 'express';
import { CreateComment } from '../../application/use-cases/CreateComment';
import { ListComments } from '../../application/use-cases/ListComments';
import { UpdateComment } from '../../application/use-cases/UpdateComment';
import { DeleteComment } from '../../application/use-cases/DeleteComment';

export class CommentController {
  constructor(
    private createComment: CreateComment,
    private listComments: ListComments,
    private updateComment: UpdateComment,
    private deleteComment: DeleteComment
  ) {}

  async create(req: Request, res: Response) {
    try {
      const { feedId } = req.params;
      const { content } = req.body;
      const userId = (req as any).user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const comment = await this.createComment.execute({ feedId, userId, content });
      res.status(201).json(comment.toJSON());
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { feedId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const [comments, total] = await this.listComments.execute(feedId, page, limit);

      res.json({
        data: comments.map(c => c.toJSON()),
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const userId = (req as any).user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const comment = await this.updateComment.execute(id, userId, content);
      res.json(comment.toJSON());
    } catch (error: any) {
      const status = error.message.includes('not found') ? 404 : 
                     error.message.includes('Unauthorized') ? 403 : 400;
      res.status(status).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = (req as any).user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      await this.deleteComment.execute(id, userId);
      res.status(204).send();
    } catch (error: any) {
      const status = error.message.includes('not found') ? 404 : 
                     error.message.includes('Unauthorized') ? 403 : 400;
      res.status(status).json({ message: error.message });
    }
  }
}

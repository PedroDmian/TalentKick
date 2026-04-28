import { Request, Response } from 'express';
import { NotificationRepository } from '../../domain/repositories/NotificationRepository';

export class NotificationController {
  constructor(private notificationRepository: NotificationRepository) {}

  async list(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) return res.status(401).json({ message: 'Not authenticated' });

      const notifications = await this.notificationRepository.findByUserId(userId);
      res.json(notifications.map(n => n.toJSON()));
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async markAsRead(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = (req as any).user?.id;
      if (!userId) return res.status(401).json({ message: 'Not authenticated' });

      await this.notificationRepository.markAsRead(id, userId);
      res.status(204).send();
    } catch (error: any) {
      const status = error.message === 'Notification not found or unauthorized' ? 404 : 400;
      res.status(status).json({ message: error.message });
    }
  }
}

import { Request, Response } from 'express';
import { RequestConnection } from '../../application/use-cases/RequestConnection';

export class ConnectionController {
  constructor(private requestConnection: RequestConnection) {}

  async request(req: Request, res: Response) {
    try {
      const requesterId = (req as any).user?.id;
      const { requestedId } = req.body;

      if (!requesterId) return res.status(401).json({ message: 'Not authenticated' });

      await this.requestConnection.execute(requesterId, requestedId);
      res.status(201).json({ message: 'Connection request sent' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

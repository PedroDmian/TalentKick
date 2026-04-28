import { Request, Response } from 'express';
import { FollowUser } from '../../application/use-cases/FollowUser';

export class FollowController {
  constructor(private followUser: FollowUser) {}

  async follow(req: Request, res: Response) {
    try {
      const followerId = (req as any).user?.id;
      const { followingId } = req.params;

      if (!followerId) return res.status(401).json({ message: 'Not authenticated' });

      await this.followUser.execute(followerId, followingId);
      res.status(200).json({ message: 'Successfully followed user' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

import { Router } from 'express';
import { FollowController } from '../controllers/FollowController';
import { FollowUser } from '../../application/use-cases/FollowUser';
import { FollowRepositoryImpl } from '../../infrastructure/persistence/FollowRepository.impl';
import { NotificationRepositoryImpl } from '../../infrastructure/persistence/NotificationRepository.impl';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

const followRepository = new FollowRepositoryImpl();
const notificationRepository = new NotificationRepositoryImpl();
const followUser = new FollowUser(followRepository, notificationRepository);
const followController = new FollowController(followUser);

router.use(authMiddleware);

router.post('/:followingId', (req, res) => followController.follow(req, res));

export default router;

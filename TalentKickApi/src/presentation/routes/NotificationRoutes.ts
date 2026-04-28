import { Router } from 'express';
import { NotificationController } from '../controllers/NotificationController';
import { NotificationRepositoryImpl } from '../../infrastructure/persistence/NotificationRepository.impl';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();
const notificationRepository = new NotificationRepositoryImpl();
const notificationController = new NotificationController(notificationRepository);

router.use(authMiddleware);

router.get('/', (req, res) => notificationController.list(req, res));
router.patch('/:id/read', (req, res) => notificationController.markAsRead(req, res));

export default router;

import { Router } from 'express';
import { ConnectionController } from '../controllers/ConnectionController';
import { RequestConnection } from '../../application/use-cases/RequestConnection';
import { ConnectionRepositoryImpl } from '../../infrastructure/persistence/ConnectionRepository.impl';
import { UserRepositoryImpl } from '../../infrastructure/persistence/UserRepository.impl';
import { NotificationRepositoryImpl } from '../../infrastructure/persistence/NotificationRepository.impl';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

const connectionRepository = new ConnectionRepositoryImpl();
const userRepository = new UserRepositoryImpl();
const notificationRepository = new NotificationRepositoryImpl();

const requestConnection = new RequestConnection(
  connectionRepository,
  userRepository,
  notificationRepository
);

const connectionController = new ConnectionController(requestConnection);

router.use(authMiddleware);

router.post('/request', (req, res) => connectionController.request(req, res));

export default router;

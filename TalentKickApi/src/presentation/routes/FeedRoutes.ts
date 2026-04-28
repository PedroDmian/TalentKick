import { Router } from 'express';
import { FeedController } from '../controllers/FeedController';
import { CreateFeed } from '../../application/use-cases/CreateFeed';
import { ListFeeds } from '../../application/use-cases/ListFeeds';
import { GetFeed } from '../../application/use-cases/GetFeed';
import { UpdateFeed } from '../../application/use-cases/UpdateFeed';
import { DeleteFeed } from '../../application/use-cases/DeleteFeed';
import { FeedRepository } from '../../infrastructure/persistence/FeedRepository.impl';
import { S3Service } from '../../infrastructure/services/S3Service';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() }); // Configurar Multer para almacenar en memoria

// Inyección manual de dependencias
const feedRepository = new FeedRepository();
const s3Service = new S3Service();

const createFeed = new CreateFeed(feedRepository, s3Service);
const listFeeds = new ListFeeds(feedRepository);
const getFeed = new GetFeed(feedRepository);
const updateFeed = new UpdateFeed(feedRepository, s3Service);
const deleteFeed = new DeleteFeed(feedRepository);

const feedController = new FeedController(
  createFeed,
  listFeeds,
  getFeed,
  updateFeed,
  deleteFeed
);

// Rutas públicas
router.get('/', (req, res) => feedController.list(req, res));
router.get('/:id', (req, res) => feedController.getById(req, res));

// Rutas protegidas (requieren token)
router.post('/', authMiddleware, upload.array('files'), (req, res) => feedController.create(req, res));
router.put('/:id', authMiddleware, upload.array('files'), (req, res) => feedController.update(req, res));
router.delete('/:id', authMiddleware, (req, res) => feedController.delete(req, res));

export default router;

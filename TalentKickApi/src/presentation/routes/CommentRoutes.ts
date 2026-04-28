import { Router } from 'express';
import { CommentController } from '../controllers/CommentController';
import { CreateComment } from '../../application/use-cases/CreateComment';
import { ListComments } from '../../application/use-cases/ListComments';
import { UpdateComment } from '../../application/use-cases/UpdateComment';
import { DeleteComment } from '../../application/use-cases/DeleteComment';
import { CommentRepositoryImpl } from '../../infrastructure/persistence/CommentRepository.impl';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

// Inyección de dependencias
const commentRepository = new CommentRepositoryImpl();
const createComment = new CreateComment(commentRepository);
const listComments = new ListComments(commentRepository);
const updateComment = new UpdateComment(commentRepository);
const deleteComment = new DeleteComment(commentRepository);

const commentController = new CommentController(
  createComment,
  listComments,
  updateComment,
  deleteComment
);

// Rutas
router.post('/:feedId', authMiddleware, (req, res) => commentController.create(req, res));
router.get('/:feedId', (req, res) => commentController.list(req, res));
router.put('/:id', authMiddleware, (req, res) => commentController.update(req, res));
router.delete('/:id', authMiddleware, (req, res) => commentController.delete(req, res));

export default router;

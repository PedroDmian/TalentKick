import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { GetUser } from '../../application/use-cases/GetUser';
import { UpdateUser } from '../../application/use-cases/UpdateUser';
import { DeleteUser } from '../../application/use-cases/DeleteUser';
import { ListUsers } from '../../application/use-cases/ListUsers';
import { AddUserImage } from '../../application/use-cases/AddUserImage';
import { UpdateUserAvatar } from '../../application/use-cases/UpdateUserAvatar';
import { UserRepositoryImpl } from '../../infrastructure/persistence/UserRepository.impl';
import { S3Service } from '../../infrastructure/services/S3Service';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Inyección manual de dependencias
const userRepositoryImpl = new UserRepositoryImpl();
const s3Service = new S3Service();

const getUser = new GetUser(userRepositoryImpl);
const updateUser = new UpdateUser(userRepositoryImpl);
const deleteUser = new DeleteUser(userRepositoryImpl);
const listUsers = new ListUsers(userRepositoryImpl);
const addUserImage = new AddUserImage(userRepositoryImpl, s3Service);
const updateUserAvatar = new UpdateUserAvatar(userRepositoryImpl, s3Service);

const userController = new UserController(
  getUser,
  updateUser,
  deleteUser,
  listUsers,
  addUserImage,
  updateUserAvatar
);

// Aplicar middleware a todas las rutas de usuario
router.use(authMiddleware);

router.get('/:id', (req, res) => userController.getOne(req, res));
router.get('/', (req, res) => userController.getAll(req, res));
router.put('/:id', (req, res) => userController.update(req, res));
router.delete('/:id', (req, res) => userController.delete(req, res));
router.post('/:id/gallery', upload.array('files'), (req, res) => userController.addToGallery(req, res));
router.post('/:id/avatar', upload.single('file'), (req, res) => userController.updateAvatar(req, res));

export default router;

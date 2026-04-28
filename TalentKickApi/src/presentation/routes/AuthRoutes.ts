import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { RegisterUser } from '../../application/use-cases/RegisterUser';
import { LoginUser } from '../../application/use-cases/LoginUser';
import { LoginFirebaseUser } from '../../application/use-cases/LoginFirebaseUser';
import { UserRepositoryImpl } from '../../infrastructure/persistence/UserRepository.impl';
import { HashService } from '../../infrastructure/services/HashService';
import { FirebaseService } from '../../infrastructure/services/FirebaseService';
import { TokenService } from '../../infrastructure/services/TokenService';

const router = Router();

// Inyección manual de dependencias
const userRepositoryImpl = new UserRepositoryImpl();
const hashService = new HashService();
const firebaseService = new FirebaseService();
const tokenService = new TokenService();

const registerUser = new RegisterUser(userRepositoryImpl, hashService);
const loginUser = new LoginUser(userRepositoryImpl, hashService);
const loginFirebaseUser = new LoginFirebaseUser(userRepositoryImpl, firebaseService);

const authController = new AuthController(
  registerUser,
  loginUser,
  loginFirebaseUser,
  tokenService
);

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));
router.post('/login-google', (req, res) => authController.loginGoogle(req, res));
router.post('/login-apple', (req, res) => authController.loginApple(req, res));
router.post('/refresh-token', (req, res) => authController.refreshToken(req, res));

export default router;

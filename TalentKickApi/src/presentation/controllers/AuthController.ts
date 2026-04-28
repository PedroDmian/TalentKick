import { Request, Response } from 'express';
import { RegisterUser } from '../../application/use-cases/RegisterUser';
import { LoginUser } from '../../application/use-cases/LoginUser';
import { LoginFirebaseUser } from '../../application/use-cases/LoginFirebaseUser';
import { TokenService } from '../../infrastructure/services/TokenService';

export class AuthController {
  constructor(
    private registerUser: RegisterUser,
    private loginUser: LoginUser,
    private loginFirebaseUser: LoginFirebaseUser,
    private tokenService: TokenService
  ) {}

  async register(req: Request, res: Response) {
    try {
      const user = await this.registerUser.execute(req.body);
      const accessToken = this.tokenService.generateAccessToken({ id: user.id, email: user.email, role: user.role });
      const refreshToken = this.tokenService.generateRefreshToken({ id: user.id, email: user.email, role: user.role });
      res.status(201).json({ user: user.toJSON(), accessToken, refreshToken });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.loginUser.execute(email, password);
      const accessToken = this.tokenService.generateAccessToken({ id: user.id, email: user.email, role: user.role });
      const refreshToken = this.tokenService.generateRefreshToken({ id: user.id, email: user.email, role: user.role });
      res.json({ user: user.toJSON(), accessToken, refreshToken });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async loginGoogle(req: Request, res: Response) {
    try {
      const { idToken, role } = req.body;
      const user = await this.loginFirebaseUser.execute(idToken, role);
      const accessToken = this.tokenService.generateAccessToken({ id: user.id, email: user.email, role: user.role });
      const refreshToken = this.tokenService.generateRefreshToken({ id: user.id, email: user.email, role: user.role });
      res.json({ user: user.toJSON(), accessToken, refreshToken });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async loginApple(req: Request, res: Response) {
    try {
      const { idToken, role } = req.body;
      const user = await this.loginFirebaseUser.execute(idToken, role);
      const accessToken = this.tokenService.generateAccessToken({ id: user.id, email: user.email, role: user.role });
      const refreshToken = this.tokenService.generateRefreshToken({ id: user.id, email: user.email, role: user.role });
      res.json({ user: user.toJSON(), accessToken, refreshToken });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh Token not provided' });
      }

      const decoded = this.tokenService.verify(refreshToken);
      const accessToken = this.tokenService.generateAccessToken({ id: decoded.id, email: decoded.email, role: decoded.role });
      const newRefreshToken = this.tokenService.generateRefreshToken({ id: decoded.id, email: decoded.email, role: decoded.role });

      res.json({ accessToken, refreshToken: newRefreshToken });
    } catch (error: any) {
      res.status(401).json({ message: 'Invalid or expired Refresh Token' });
    }
  }
}

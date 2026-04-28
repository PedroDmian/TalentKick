import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../../infrastructure/services/TokenService';

// Extendemos la interfaz Request de Express para incluir el objeto 'user'
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string; role: string };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const tokenService = new TokenService();

  console.log('token ::', token);


  try {
    const decoded = tokenService.verify(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
